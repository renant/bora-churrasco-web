import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (request.headers.get('x-api-key') !== process.env.API_KEY) {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    )
  }

  const imageName = uuidv4()

  const imageStorage = ref(storage, 'images/')

  const imageRef = ref(imageStorage, imageName)

  if (file != null) {
    if (file instanceof Blob) {
      const metadata = {
        contentType: file.type,
      }

      const compressedImage = await sharp(await file.arrayBuffer())
        .resize({ width: 800 })
        .jpeg({ quality: 60 })
        .toBuffer()

      await uploadBytesResumable(imageRef, compressedImage, metadata)

      const url = await getDownloadURL(imageRef)

      return NextResponse.json(
        { message: 'upload success', url },
        {
          status: 201,
        },
      )
    }
  }

  return NextResponse.json(
    { message: 'error on upload file' },
    {
      status: 400,
    },
  )
}
