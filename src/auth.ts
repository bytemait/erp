import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { env, role } from "@/utils/consts";
import bcrypt from "bcryptjs";
import prisma from "./utils/prisma";
import { extractEnrollmentNoByEmail, extractNameByEmail, extractRoleByEmail, getUserIdByEmail, getUserRoleByEmail } from "./utils/extract";
import { Role } from "@prisma/client";

interface returnedUser {
    id: string;
    email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "staff",
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                if (!email || !password) {
                    throw new CredentialsSignin("Invalid email or password");
                }
                const staff = await prisma.staff.findUnique({
                    where: {
                        email
                    },
                });
                if (!staff) {
                    throw new CredentialsSignin("No staff found");
                }
                if (!staff.password) {
                    throw new CredentialsSignin("No password found");
                }
                const isMatch = await bcrypt.compare(password, staff.password);
                if (!isMatch) {
                    throw new CredentialsSignin("Invalid password");
                }
                return staff as returnedUser;
            }
        }),
        Credentials({
            id: "admin",
            // credentials: {
            //     email: { label: "email", type: "text", placeholder: "email" },
            //     password: { label: "Password", type: "password", placeholder: "Password" },
            // },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                if (!email || !password) {
                    throw new CredentialsSignin("Invalid email or password");
                }
                const admin = await prisma.admin.findUnique({
                    where: {
                        email
                    },
                });
                if (!admin) {
                    throw new CredentialsSignin("No admin found");
                }
                if (!admin.password) {
                    throw new CredentialsSignin("No password found");
                }
                const isMatch = await bcrypt.compare(password, admin.password);
                if (!isMatch) {
                    throw new CredentialsSignin("Invalid password");
                }
                return admin as returnedUser;
            }
        }),
        MicrosoftEntraID({
            clientId: env.microsoft.clientId,
            clientSecret: env.microsoft.clientSecret,
            issuer: env.microsoft.issuer,
        }),
    ],

    secret: env.nextAuthSecret,

    callbacks: {
        async signIn({ user, account }) {
            if (account?.type === "credentials") {
                return true;
            }
            if (account?.provider === "microsoft-entra-id") {
                // if (!profile) {
                //     return false;
                // }
                // if (!profile.aud || !profile.iss) {
                //     return false;
                // }
                // if (profile.aud === env.microsoft.clientId && profile.iss === env.microsoft.issuer) {
                //     return false;
                // }
                if (!user.email) {
                    return false;
                }
                const userRole = extractRoleByEmail(user?.email);
                if (!userRole) {
                    return false;
                }
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: user.email,
                    },
                });
                if (dbUser) {
                } else {
                    let newUser;
                    const name = extractNameByEmail(user?.email);
                    if (!name) {
                        return false;
                    }
                    if (userRole === role.STUDENT) {
                        const enrollmentNo = extractEnrollmentNoByEmail(user?.email);

                        if (!enrollmentNo) {
                            return false;
                        }
                        newUser = await prisma.student.create({
                            data: {
                                email: user.email,
                                enrollmentNo: enrollmentNo,
                                name: name,
                            },
                        });
                    } else if (userRole === role.FACULTY) {
                        newUser = await prisma.faculty.create({
                            data: {
                                email: user.email,
                                name: name
                            },
                        });
                    } else {
                        return false;
                    }
                    if (!newUser) {
                        return false;
                    }
                    const dbUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            userId: newUser.id,
                            name: name,
                            // role: userRole as Role,
                            role: userRole === role.STUDENT ? Role.STUDENT : Role.FACULTY,
                        },
                    });
                    if (!dbUser) {
                        return false;
                    }
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user?.email) {
                const userId = await getUserIdByEmail(user.email);
                const userRole = await getUserRoleByEmail(user.email);

                token.id = userId;
                token.email = user.email;
                token.role = userRole as Role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    role: token.role as string,
                    emailVerified: null
                };
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },

    pages: {
        signIn: "/",
        signOut: "/",
        error: "/403",
    },

})