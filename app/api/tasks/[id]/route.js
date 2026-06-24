import { prisma } from "../../../../lib/prisma"

export async function DELETE(
  request,
  { params }
) {

  const { id } = await params

  await prisma.task.delete({
    where: {
      id: Number(id),
    },
  })

  return Response.json({
    message: "Task deleted",
  })

}

export async function PUT(
  request,
  { params }
) {

  const { id } = await params

  const body = await request.json()

  const updatedTask =
    await prisma.task.update({

      where: {
        id: Number(id),
      },

      data: {
        title: body.title,
        status: body.status,
        priority: body.priority,
        dueDate: new Date(body.dueDate),
      },

    })

  return Response.json(updatedTask)

}