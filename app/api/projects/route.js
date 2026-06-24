import { prisma } from "../../../lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: {
      id: "asc",
    },
  })

  return Response.json(projects)
}

export async function POST(request) {
  const body = await request.json()

  if (!body.name) {
    return Response.json(
      { message: "Project name is required" },
      { status: 400 }
    )
  }

  const newProject = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description || "",
      status: body.status || "Pending",
      priority: body.priority || "Medium",
      dueDate: body.dueDate ? new Date(body.dueDate) : new Date(),
      progress: Number(body.progress ?? 0),
    },
  })

  return Response.json({
    message: "Project created",
    project: newProject,
  })
}