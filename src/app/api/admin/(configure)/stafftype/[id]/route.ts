import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
    errorResponse,
    successResponse,
    failureResponse,
} from "@/utils/response";

export async function GET(
     request: NextRequest,
      { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: staffTypeId } = await params;

        const staffType = await prisma.staffType.findFirst({
            where: { staffType: staffTypeId },
        });

        if (!staffType) {
            return NextResponse.json(errorResponse(404, "Staff type not found"), {
                status: 404,
            });
        }

        return NextResponse.json(
            successResponse(200, staffType, "Staff type retrieved successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.error("GET Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
      { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: staffTypeId } = await params;

        const body = await request.json();
        const { stafftype } = body;

        if (!stafftype) {
            return NextResponse.json(errorResponse(400, "Staff type name is required"), {
                status: 400,
            });
        }

        const existingStaffType = await prisma.staffType.findFirst({
            where: { staffType: stafftype },
        });

        if (existingStaffType && existingStaffType.staffType !== staffTypeId) {
            return NextResponse.json(errorResponse(409, "Staff type already exists"), {
                status: 409,
            });
        }

        const updatedStaffType = await prisma.staffType.update({
            where: { staffType: staffTypeId },
            data: { staffType: stafftype },
        });

        return NextResponse.json(
            successResponse(200, updatedStaffType, "Staff type updated successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.error("PUT Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: staffTypeId } = await params;

        const staffType = await prisma.staffType.findFirst({
            where: { staffType: staffTypeId },
        });

        if (!staffType) {
            return NextResponse.json(errorResponse(404, "Staff type not found"), {
                status: 404,
            });
        }

        await prisma.staffType.delete({
            where: { staffType: staffTypeId },
        });

        return NextResponse.json(
            successResponse(200, null, "Staff type deleted successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
}