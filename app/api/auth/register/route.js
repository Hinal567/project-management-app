import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request) {

  try {

    const body = await request.json()

    const fullName = body.fullName?.trim()
    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (!fullName || !email || !password) {

      return Response.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        }
      )

    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (existingUser) {

      return Response.json(
        {
          error: "User already exists",
        },
        {
          status: 400,
        }
      )

    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user =
      await prisma.user.create({

        data: {
          fullName,
          email,
          password: hashedPassword,
        },

      })

    return Response.json({
      message: "User registered successfully",
      user,
    })

  } catch (error) {

    console.error(error)

    return Response.json(
      {
        error: "Registration failed",
      },
      {
        status: 500,
      }
    )

  }

}