import { auth } from "@/auth";
import { getToken } from 'next-auth/jwt';
import { NextRequest } from "next/server";
import { env } from "./consts";

export const getClientSession = async () => {
    // const currentSession = await axios.get("/api/auth/session");
    const session = await auth();
    return session?.user;
};

export const getServerToken = async (req: NextRequest) => {
    const token = await getToken({ req, secret: env.nextAuthSecret });
    return token;
};