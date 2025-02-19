import prisma from "@/utils/prisma";

export async function createNotification(
    userId: string | null,
    title: string,
    message: string
) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
            },
        });

        return { success: true, data: notification };
    } catch (error) {
        console.error("Error creating notification:", error);
        return { success: false, error: "Failed to create notification" };
    }
}