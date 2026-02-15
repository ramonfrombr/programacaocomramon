const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.career.createMany({
      data: [
        { name: "Web Development", slug: "webdev" },
        { name: "Mobile Development", slug: "mobile" },
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
