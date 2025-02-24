import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

import {
    errorResponse,
    successResponse,
    failureResponse,
} from "@/utils/response";


// GET request to fetch user profile
export async function GET({ params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(errorResponse(400, "ID is required"), {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json(errorResponse(404, "User not found"), {
                status: 404,
            });
        }
        let newUser;

        if (user.role === "ADMIN") {
            newUser = await prisma.admin.findUnique({
                where: { id },
            });
        } else if (user.role === "STAFF") {
            newUser = await prisma.staff.findUnique({
                where: { id },
            });
        } else {
            return NextResponse.json(errorResponse(400, "Invalid role"), {
                status: 400,
            });
        }

        return NextResponse.json(successResponse(200, newUser, "User found"), {
            status: 200,
        });
    } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        return NextResponse.json(failureResponse(error), { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { username, email, role } = body;
		console.log(body);
        if (!id) {
            return NextResponse.json(errorResponse(400, "ID is required"), {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({ where: { userId : id } });

        if (!user) {
            return NextResponse.json(errorResponse(404, "User not found"), {
                status: 404,
            });
        }

        let updatedUser;
        if (role === "ADMIN") {
            const admin = await prisma.admin.findUnique({ where: { id } });
            if (!admin) {
                return NextResponse.json(errorResponse(404, "Admin not found"), {
                    status: 404,
                });
            }
            if(admin.email != email) {
                const emailExists = await prisma.admin.findFirst({
                    where: { email },
                });
                if (emailExists) {
                    return NextResponse.json(
                        errorResponse(409, "Email already exists"),
                        { status: 409 }
                    );
                }
            }
            updatedUser = await prisma.admin.update({
                where: { id },
                data: {
                    name: username,
                    email,
                    
                },
            });
			console.log(updatedUser);
        } else if (role === "STAFF") {
            
            const staff = await prisma.staff.findUnique({ where: { id } });
            
            if (!staff) {
                return NextResponse.json(errorResponse(404, "Staff not found"), {
                    status: 404,
                });
            }
            if(staff.email != email) {
                return NextResponse.json(
                    errorResponse(409, "Email already exists"),
                    { status: 409 }
                )
            }
            
            updatedUser = await prisma.staff.update({
                where: { id },
                data: {
                    name : username,
                    email,
                    
                },
            });
        } else {
            return NextResponse.json(errorResponse(400, "Invalid role"), {
                status: 400,
            });
        }

		await prisma.user.update({
			where: { userId: id },
			data: {
				email,
				
				name : username,
			}
		});
		
        return NextResponse.json(
            successResponse(200, updatedUser, "User updated successfully"),
            { status: 200 }
        );
    } catch (err) {
        console.error("PUT Error:", err);
        const error = err instanceof Error ? err.message : String(err);
        return NextResponse.json(failureResponse(error), { status: 500 });
    }
}

// DELETE request to delete a user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(errorResponse(400, "ID is required"), {
                status: 400,
            });
        }

        const userExisted = await prisma.user.findUnique({ where: { userId :  id } });
        if (!userExisted) {
            return NextResponse.json(errorResponse(404, "User not found"), {
                status: 404,
            });
        }

        const role = userExisted.role;

        if (role === "ADMIN") {
            const admin = await prisma.admin.findUnique({ where: { id } });
            if (!admin) {
                return NextResponse.json(errorResponse(404, "Admin not found"), {
                    status: 404,
                });
            }
            await prisma.admin.delete({ where: { id } });
        
        } else if (role === "STAFF") {
            const staff = await prisma.staff.findUnique({ where: { id } });
            if (!staff) {
                return NextResponse.json(errorResponse(404, "Staff not found"), {
                    status: 404,
                });
            }
            


            await prisma.staff.delete({ where: { id } });
        }

		await prisma.user.delete({ where: { userId : id } });

        return NextResponse.json(
            successResponse(200, null, "User deleted successfully"),
            { status: 200 }
        );
    } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        return NextResponse.json(failureResponse(error), { status: 500 });
    }
}
