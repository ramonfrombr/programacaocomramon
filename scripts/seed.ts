const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "ReactJS" },
        { name: "Redux" },
        { name: "NextJS" },
        { name: "VueJS" },
        { name: "Pinia" },
        { name: "NuxtJS" },
        { name: "React Native" },
        { name: "NodeJS" },
        { name: "ExpressJS" },
        { name: "NestJS" },
        { name: "Python" },
        { name: "Flask" },
        { name: "Django" },
        { name: "SQLAlchemy" },
        { name: "PHP" },
        { name: "Laravel" },
        { name: "Ruby" },
        { name: "Ruby on Rails" },
        { name: "MySQL" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Firestore" },
        { name: "Supabase" },
        { name: "Prisma" },
        { name: "Redis" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "Terraform" },
        { name: "RabbitMQ" },
        { name: "C" },
        { name: "TailwindCSS" },
        { name: "Bootstrap" },
        { name: "CSS" },
        { name: "HTML" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
