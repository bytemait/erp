import prisma from "@/utils/prisma";
import bcrypt from 'bcryptjs';
import { env } from "@/utils/consts";
import { Role, FontSize, FontWeight, FontType } from "@prisma/client";

const departments = [
  "COMPUTER_SCIENCE_AND_ENGINEERING",
  "INFORMATION_TECHNOLOGY",
  "ELECTRONICS_AND_COMMUNICATION_ENGINEERING",
  "MECHANICAL_AND_AUTOMATION_ENGINEERING",
  "BACHELOR_OF_BUSINESS_ADMINISTRATION",
  "MASTER_OF_BUSINESS_ADMINISTRATION"
];

const designations = [
  "ACCOUNTANT",
  "ASSISTANT_PROFESSOR",
  "ASSOCIATE_PROFESSOR",
  "ASSOCIATE_PROFESSOR_HOD",
  "DEAN",
  "DIRECTOR",
];

const staffTypes = [
  "PLACEMENT_OFFICER",
  "ACCOUNTS_OFFICER",
  "LIBRARIAN",
]

const uiSettings = {
  isThemeSelectable: true,
  theme: "light", 
  backgroundColor: "#ffffff", 
  primaryColor: "#1E88E5", 
  secondaryColor: "#42A5F5", 
  borderRadius: "4px", 
  fontSize: FontSize.BASE, 
  fontWeight: FontWeight.NORMAL, 
  headingFont: FontType.INTER, 
  textFont: FontType.OPEN_SANS, 
};

async function main() {
  const salt = await bcrypt.genSalt(env.saltRounds);

  if (!env.adminSeed.email || !env.adminSeed.password) {
    throw new Error("Admin seed email or password is not set");
  }

  const admin = await prisma.admin.upsert({
    where: {
      email: env.adminSeed.email,
    },
    update: {},
    create: {
      email: env.adminSeed.email,
      password: await bcrypt.hash(env.adminSeed.password, salt),
    },
  });
  if (admin) {
    await prisma.user.upsert({
      where: {
        email: env.adminSeed.email,
      },
      update: {},
      create: {
        email: env.adminSeed.email,
        userId: admin.id,
        role: Role.ADMIN,
      },
    });
  }

  for (const department of departments) {
    await prisma.department.upsert({
      where: {
        department: department,
      },
      update: {},
      create: {
        department: department,
      },
    });
  }

  for (const designation of designations) {
    await prisma.designation.upsert({
      where: {
        designation: designation,
      },
      update: {},
      create: {
        designation: designation,
      },
    });
  }

  for (const staffType of staffTypes) {
    await prisma.staffType.upsert({
      where: {
        staffType: staffType,
      },
      update: {},
      create: {
        staffType: staffType,
      },
    });
  }

  await prisma.settings.upsert({
    where: { id: "default-settings" }, // You can use a fixed ID or let it auto-generate
    update: uiSettings,
    create: uiSettings,
  });

  console.log("Seeding completed successfully");
}

main()
  .catch(e => console.error("Seeding error : ", e))
  .finally(async () => {
    await prisma.$disconnect();
  });