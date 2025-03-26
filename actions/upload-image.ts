"use server"

import { cloudinary } from "@/lib/cloudinary"

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const b64 = Buffer.from(buffer).toString("base64")
    const dataURI = `data:${file.type};base64,${b64}`

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          folder: "memory-vault",
        },
        (error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        },
      )
    })

    return {
      success: true,
      url: (result as any).secure_url,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

