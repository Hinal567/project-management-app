import { prisma } from "../../../../lib/prisma"

export async function DELETE(
  request,
  { params }
) {

  const { id } = await params

  await prisma.project.delete({
    where: {
      id: Number(id),
    },
  })

  return Response.json({
    message: "Project deleted",
  })

}
export async function PUT(
  request,
  { params }
) {

  const { id } = await params

  const body = await request.json()

  const updatedProject =
    await prisma.project.update({

      where: {
        id: Number(id),
      },

      data: {

        name: body.name,
        description: body.description,
        status: body.status,
        priority: body.priority,
        dueDate: new Date(body.dueDate),
        progress: Number(body.progress),

      },

    })

  return Response.json(updatedProject)

}