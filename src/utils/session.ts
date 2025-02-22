import { getToken } from 'next-auth/jwt';
import { NextRequest } from "next/server";
import { env } from "./consts";
import prisma from "./prisma";
import axios from "axios";

export const getClientSession = async () => {
    const session = await axios.get("/api/auth/session");
    // const session = await auth();
    return session.data.user;
};

export const getServerToken = async (req: NextRequest) => {
    const token = await getToken({ req, secret: env.nextAuthSecret });
    return token;
};

export const getUserFromToken = async (req: NextRequest) => {
    const token = await getServerToken(req);
    if (!token) return null;
    const idFromToken = token?.id;
    if (typeof idFromToken !== "string") return null;
    const user = await prisma.user.findUnique({
        where: { userId: idFromToken },
    });
    return user;
};