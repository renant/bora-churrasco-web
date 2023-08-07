import { storage } from '@/lib/firebase'
import Recipe from '@/models/recipe'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const createNewRecipe = async (recipeTitle: string): Promise<Recipe> => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are responsible for creating Brazilian barbecue recipes, you receive from the user, only title of recipe, no more information.\n\nYou need response only JSON, without any more information.\n\nThe format of JSON should be like this sample:\n\n   {\n     "name": "Title of recipe",\n     "ingredients": [\n       "first",\n       "second"\n     ],\n     "steps": [\n       "instruction one",\n       "next instruction"\n     ]\n   }',
      },
      {
        role: 'user',
        content: recipeTitle,
      },
    ],
    temperature: 0,
    max_tokens: 960,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const result = JSON.parse(response.data.choices[0].message.content)

  return new Recipe(
    '',
    result.name,
    '',
    result.ingredients,
    result.steps,
    new Date(),
    false,
    'Bora Churrasco',
  )
}

const createRecipeImage = async (recipe: Recipe): Promise<string> => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are responsible for receiving instructions from the user to create a prompt that will be used in StableDiffusion to create Brazilian barbecue images, you must response only the prompt, without any more information, to use direct in StableDiffusion',
      },
      {
        role: 'user',
        content: `Create realistic image prompt for recipe ${recipe.name}, photography, realistic, 3D, surreal`,
      },
    ],
    temperature: 0,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const prompt = response.data.choices[0].message.content

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      key: process.env.STABLE_DIFFUSION_API_KEY,
      prompt,
      width: '800',
      height: '800',
    }),
  }

  const imageResponse = await fetch(
    'https://stablediffusionapi.com/api/v3/text2img',
    requestOptions,
  )
  const imageResponseJson = await imageResponse.json()
  const image_url = imageResponseJson.output[0]

  const responseUrl = await fetch(image_url)
  const blob = await responseUrl.blob()

  if (blob instanceof Blob) {
    const imageName = uuidv4()
    const imageStorage = ref(storage, 'images/')
    const imageRef = ref(imageStorage, imageName)

    const metadata = {
      contentType: blob.type,
    }

    const compressedImage = await sharp(await blob.arrayBuffer())
      .resize({ width: 800 })
      .jpeg({ quality: 60 })
      .toBuffer()

    await uploadBytesResumable(imageRef, compressedImage, metadata)

    return await getDownloadURL(imageRef)
  }

  return ''
}

export { createNewRecipe, createRecipeImage }
