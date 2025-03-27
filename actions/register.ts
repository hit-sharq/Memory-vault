"use server"

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function register(formData: FormData) {
  console.log("Register function called with data:", formData);
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
      console.error("Registration failed: All fields are required");
      return { success: false, error: "All fields are required" }
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      console.error("Registration failed: Email already in use");
      return { success: false, error: "Email already in use" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    console.log("User registered successfully:", newUser);
    return { success: true }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error: "Failed to register user" }
  }
}
