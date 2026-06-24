export default function ProjectCard({
  project,
}) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          {project.name}
        </h2>

        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">

          {project.status}

        </span>

      </div>

      <p className="text-gray-500 mt-4">
        Due: {project.dueDate}
      </p>

      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span>Progress</span>

          <span>{project.progress}%</span>

        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">

          <div
            className="bg-black h-3 rounded-full"
            style={{
              width: `${project.progress}%`
            }}
          />

        </div>

      </div>

    </div>
  )
}