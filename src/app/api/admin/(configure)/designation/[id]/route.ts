import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const designation = await prisma.designation.findFirst({
            where: { designation: params.id },
        })

        if (!designation) {
            return NextResponse.json(
                { message: "Designation not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(designation)
    } catch (error) {
        console.error("Failed to fetch designation:", error)
        return NextResponse.json(
            { message: "Failed to fetch designation" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { designation } = body

        if (!designation) {
            return NextResponse.json(
                { message: "Designation name is required" },
                { status: 400 }
            )
        }

        const existingDesignation = await prisma.designation.findFirst({
            where: { designation },
        })

        if (existingDesignation && existingDesignation.designation !== params.id) {
            return NextResponse.json(
                { message: "Designation already exists" },
                { status: 400 }
            )
        }

        const updatedDesignation = await prisma.designation.update({
            where: { designation: params.id },
            data: { designation },
        })

        return NextResponse.json(updatedDesignation)
    } catch (error) {
        console.error("Failed to update designation:", error)
        return NextResponse.json(
            { message: "Failed to update designation" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const designation = await prisma.designation.findFirst({
            where: { designation: params.id },
        })

        if (!designation) {
            return NextResponse.json(
                { message: "Designation not found" },
                { status: 404 }
            )
        }

        await prisma.designation.delete({
            where: { designation: params.id },
        })

        return NextResponse.json({ message: "Designation deleted successfully" })
    } catch (error) {
        console.error("Failed to delete designation:", error)
        return NextResponse.json(
            { message: "Failed to delete designation" },
            { status: 500 }
        )
    }
} 