import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
    errorResponse,
    successResponse,
    failureResponse,
} from "@/utils/response";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { stafftype } = body;

        if (!stafftype) {
            return NextResponse.json(errorResponse(400, "Staff type name is required"), {
                status: 400,
            });
        }

        const staffTypeExists = await prisma.staffType.findUnique({ where: { staffType: stafftype } });
        if (staffTypeExists) {
            return NextResponse.json(errorResponse(409, "Staff type already exists"), {
                status: 409,
            });
        }

        const newStaffType = await prisma.staffType.create({
            data: { staffType: stafftype },
        });

        return NextResponse.json(
            successResponse(201, newStaffType, "Staff type created successfully"),
            { status: 201 }
        );
    } catch (error) {
        console.error("POST Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
}

export async function GET() {
    try {
        const staffTypes = await prisma.staffType.findMany({
            select: {
                staffType: true,
            },
        });

        if (!staffTypes || staffTypes.length === 0) {
            return NextResponse.json(errorResponse(404, "No staff types found"), {
                status: 404,
            });
        }

        return NextResponse.json(
            successResponse(200, staffTypes, "Staff types retrieved successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.error("GET Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
}