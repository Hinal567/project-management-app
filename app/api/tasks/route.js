import { prisma } from "../../../lib/prisma"

export async function GET() {

  const tasks = await prisma.task.findMany({
    orderBy: {
      id: "asc",
    },
  })

  return Response.json(tasks)

}

export async function POST(request) {

  try {

    const body = await request.json()

    const title = body.title?.trim()
    const status = body.status?.trim()
    const priority = body.priority?.trim()
    const projectId = Number(body.projectId)
    const dueDate = new Date(body.dueDate)

    if (!title || !status || !priority) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (Number.isNaN(projectId) || projectId <= 0) {
      return Response.json(
        { error: "Invalid project" },
        { status: 400 }
      )
    }

    if (Number.isNaN(dueDate.getTime())) {
      return Response.json(
        { error: "Invalid due date" },
        { status: 400 }
      )
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        status,
        priority,
        dueDate,
        projectId,
      },
    })

    return Response.json(newTask)

  } catch {

    return Response.json(
      { error: "Failed to create task" },
      { status: 500 }
    )

  }

}