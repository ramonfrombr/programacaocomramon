const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "Python" },
        { name: "PHP" },
        { name: "Ruby" },
        { name: "C" },
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "MongoDB" },
        { name: "Redis" },
      ],
    });

    await database.career.createMany({
      data: [
        { name: "Web Development", slug: "webdev" },
        { name: "Mobile Development", slug: "mobile" },
        { name: "Embedded Systems", slug: "embedded" },
        { name: "Data Science", slug: "data-science" },
        { name: "Artificial Intelligence", slug: "ai" },
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
