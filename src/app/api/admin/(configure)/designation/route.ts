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
        const { designation } = body;

        if (!designation) {
            return NextResponse.json(errorResponse(400, "Designation name is required"), {
                status: 400,
            });
        }

        const designationExists = await prisma.designation.findUnique({ where: { designation } });
        if (designationExists) {
            return NextResponse.json(errorResponse(409, "Designation already exists"), {
                status: 409,
            });
        }

        const newDesignation = await prisma.designation.create({
            data: { designation },
        });

        return NextResponse.json(
            successResponse(201, newDesignation, "Designation created successfully"),
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
        const designations = await prisma.designation.findMany({
            select: {
                designation: true,
            },
        });

        if (!designations || designations.length === 0) {
            return NextResponse.json(errorResponse(404, "No designations found"), {
                status: 404,
            });
        }

        return NextResponse.json(
            successResponse(200, designations, "Designations retrieved successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.error("GET Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown server error";
        return NextResponse.json(failureResponse(errorMessage), { status: 500 });
    }
} 