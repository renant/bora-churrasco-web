import Recipe from '@/models/recipe'

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

export { createNewRecipe }
