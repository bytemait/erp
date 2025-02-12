import { role } from "./consts";
import prisma from "./prisma";

export const extractRoleByEmail = (email: string): string | null => {
  const [before, after] = email.split("@");
  if (!after.endsWith("mait.ac.in")) return null;
  const regex = /\.(\d{11})$/;
  if (regex.test(before)) {
    return role.STUDENT;
  }
  return role.FACULTY;
};

export const extractEnrollmentNoByEmail = (email: string): string | null => {
  if (extractRoleByEmail(email) !== role.STUDENT) return null;
  const before = email.split("@")[0];
  const enrollmentNo = before.split(".")[1];
  return enrollmentNo;
};

export const extractNameByEmail = (email: string): string | null => {
  const [before, after] = email.split("@");
  if (!after.endsWith("mait.ac.in")) return null;
  const userRole = extractRoleByEmail(email);
  let name: string | null = null;
  if (userRole === role.STUDENT) {
    name = before.split(".")[0];
  } else if (userRole === role.FACULTY) {
    name = before;
  }
  return name;
};

export const getUserIdByEmail = async (
  email: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user?.userId;
};

export const getUserRoleByEmail = async (
  email: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user?.role;
};

export const getUserByEmail = async (email: string) => {
  const userId = await getUserIdByEmail(email);
  const userRole = await getUserRoleByEmail(email);

  if (!userId || !role) return null;

  let userDetails;
  if (userRole === role.STUDENT) {
    userDetails = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
  } else if (userRole === role.ADMIN) {
    userDetails = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
  } else if (userRole === role.FACULTY) {
    userDetails = await prisma.faculty.findUnique({
      where: {
        email: email,
      },
    });
  } else if (userRole === role.STAFF) {
    userDetails = await prisma.staff.findUnique({
      where: {
        email: email,
      },
    });
  } else {
    return null;
  }
  return userDetails;
};
