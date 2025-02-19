import prisma from "./prisma";

export async function createNotification(
    userId: string,
    title: string,
    message: string
) {

    try {
        const notification = await prisma.notification.create({
            data: {
                userId: userId,
                title: title,
                message: message,
            },
        });

        return { success: true, data: notification };
    } catch (error) {
        return { success: false, error: error };
    }
}