import { User } from "@/types/user";
import { role } from "./consts";
import prisma from "./prisma";
import { error } from "./response";

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

export const getIdByEmail = async (
  email: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user?.id;
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

export const getUserAndChildByEmail = async (email: string): Promise<User> => {
  const userRole = await getUserRoleByEmail(email);

  if (!userRole || !email) error("Credentials not found");

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) error("User not found");

  let childDetails;
  if (userRole === role.STUDENT) {
    childDetails = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
  } else if (userRole === role.ADMIN) {
    childDetails = await prisma.admin.findUnique({
      omit: {
        password: true,
      },
      where: {
        email: email,
      },
    });
  } else if (userRole === role.FACULTY) {
    childDetails = await prisma.faculty.findUnique({
      where: {
        email: email,
      },
    });
  } else if (userRole === role.STAFF) {
    childDetails = await prisma.staff.findUnique({
      omit: {
        password: true,
      },
      where: {
        email: email,
      },
    });
  } else {
    error("Invalid Role");
  }

  const userDetails = {
    id: user?.id,
    name: user?.name,
    email: email,
    mobile: user?.mobile,
    role: userRole,
    child: childDetails,
  };

  return userDetails as User;
};
