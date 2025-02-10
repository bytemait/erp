import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

// declare module "next-auth/adapters" {
//     interface AdapterUser {
//         role?: string;
//     }
// }