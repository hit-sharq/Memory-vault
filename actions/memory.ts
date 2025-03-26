"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function createMemory(formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: "Not authenticated" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string | null

    if (!title || !description) {
      return { success: false, error: "Title and description are required" }
    }

    await db.memory.create({
      data: {
        title,
        description,
        imageUrl,
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error creating memory:", error)
    return { success: false, error: "Failed to create memory" }
  }
}

export async function getMemories() {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: "Not authenticated" }
    }

    const memories = await db.memory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, data: memories }
  } catch (error) {
    console.error("Error fetching memories:", error)
    return { success: false, error: "Failed to fetch memories" }
  }
}

export async function deleteMemory(id: string) {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: "Not authenticated" }
    }

    // Verify ownership
    const memory = await db.memory.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!memory) {
      return { success: false, error: "Memory not found or not authorized" }
    }

    await db.memory.delete({
      where: {
        id,
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error deleting memory:", error)
    return { success: false, error: "Failed to delete memory" }
  }
}

