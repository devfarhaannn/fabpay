import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

const demoUsers = [
    {
      firstName: "Rahul",
      lastName: "Sharma",
      username: "demo_rahul",
      email: "rahul@demo.fabpay",
    },
    {
      firstName: "Aman",
      lastName: "Patel",
      username: "demo_aman",
      email: "aman@demo.fabpay",
    },
    {
      firstName: "Priya",
      lastName: "Shah",
      username: "demo_priya",
      email: "priya@demo.fabpay",
    },
  ];

const main = async () => {
  const password = await bcrypt.hash(
    "Demo@1234",
    10
  );

  for (const demoUser of demoUsers) {
    await prisma.user.upsert({
      where: {
        username: demoUser.username,
      },

      update: {},

      create: {
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        username: demoUser.username,
        email: demoUser.email,
        password,

        account: {
          create: {
            balance: "0",
          },
        },
      },
    });
  }

  console.log(
    "Demo recipient accounts created successfully."
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });