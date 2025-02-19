import { auth } from "@/auth";
import { getToken } from 'next-auth/jwt';
import { NextRequest } from "next/server";
import { env } from "./consts";
import prisma from "./prisma";

export const getClientSession = async () => {
    // const currentSession = await axios.get("/api/auth/session");
    const session = await auth();
    return session?.user;
};

export const getServerToken = async (req: NextRequest) => {
    const token = await getToken({ req, secret: env.nextAuthSecret });
    return token;
};

export const getUserFromToken = async (req: NextRequest) => {
    const token = await getServerToken(req);
    if (!token) return null;
    const userId = token?.id;
    if (typeof userId !== "string") return null;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    return user;
};