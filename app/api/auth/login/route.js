import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request) {

  try {

    const body = await request.json()

    const email =
      body.email?.trim().toLowerCase()

    const password =
      body.password

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (!user) {

      return Response.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 400,
        }
      )

    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordMatch) {

      return Response.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 400,
        }
      )

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "my-secret-key",
      {
        expiresIn: "7d",
      }
    )

   return Response.json({
  message: "Login successful",
  token,

  user: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  },
})

  } catch (error) {

    console.log(error)

    return Response.json(
      {
        error: "Login failed",
      },
      {
        status: 500,
      }
    )

  }

}