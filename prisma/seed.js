require("dotenv/config")

const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
})

async function main() {

  await prisma.project.createMany({

    data: [

      {
        name: "Dashboard App",
        description: "Project Management Dashboard",
        status: "Active",
        priority: "High",
        dueDate: new Date("2026-08-20"),
        progress: 80,
      },

      {
        name: "Finance Tracker",
        description: "Track expenses and income",
        status: "Completed",
        priority: "Medium",
        dueDate: new Date("2026-06-10"),
        progress: 100,
      },

      {
        name: "AI Resume Builder",
        description: "Generate resumes using AI",
        status: "Pending",
        priority: "Low",
        dueDate: new Date("2026-07-02"),
        progress: 40,
      },

    ],

  })

  console.log("Projects Added Successfully 🚀")

}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })