import { prisma } from "../../../lib/prisma"
import TaskCard from "../../../components/TaskCard"
import CreateTaskModal from "../../../components/CreateTaskModal"

export default async function TasksPage() {

  const tasks = await prisma.task.findMany({
    orderBy: {
      id: "asc",
    },
  })
  const projects = await prisma.project.findMany({
  orderBy: {
    id: "asc",
  },
})

  const todoTasks = tasks.filter(
    task => task.status === "Todo"
  )

  const inProgressTasks = tasks.filter(
    task => task.status === "In Progress"
  )

  const doneTasks = tasks.filter(
    task => task.status === "Done"
  )

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500">
            Manage project tasks and workflow
          </p>

        </div>

        <CreateTaskModal projects={projects} />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Todo Column */}

        <div className="bg-gray-100 rounded-xl p-4">

          <h2 className="font-bold text-lg mb-4">
            Todo
          </h2>

          {todoTasks.map(task => (

            <TaskCard
              key={task.id}
              task={task}
            />

          ))}

        </div>

        {/* In Progress Column */}

        <div className="bg-blue-50 rounded-xl p-4">

          <h2 className="font-bold text-lg mb-4">
            In Progress
          </h2>

          {inProgressTasks.map(task => (

            <TaskCard
              key={task.id}
              task={task}
            />

          ))}

        </div>

        {/* Done Column */}

        <div className="bg-green-50 rounded-xl p-4">

          <h2 className="font-bold text-lg mb-4">
            Done
          </h2>

          {doneTasks.map(task => (

            <TaskCard
              key={task.id}
              task={task}
            />

          ))}

        </div>

      </div>

    </div>

  )

}