import { createNotification } from "./alerts";
import prisma from "./prisma";

interface UserProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: string | number | boolean | Date | null;
}

export async function createAnnouncementNotifications(announcement: { title: string; filter: Record<string, unknown>; role: string }) {
  const { title, filter, role } = announcement;

  const filterObject = filter ? (typeof filter === 'string' ? JSON.parse(filter) : filter) : {};

  const users = await getUsersByRole(role);

  users.forEach(async (user) => {
    if (Object.entries(filterObject).every(([key, value]) => user[key] === value)) {
      await createNotification(user.id, "New Announcement", title);
    }
  });
}

async function getUsersByRole(role: string): Promise<UserProfile[]> {
  switch (role) {
    case "ADMIN":
      return prisma.admin.findMany();
    case "FACULTY":
      return prisma.faculty.findMany();
    case "STUDENT":
      return prisma.student.findMany();
    default:
      return [];
  }
}