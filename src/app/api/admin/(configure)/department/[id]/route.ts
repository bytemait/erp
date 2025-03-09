import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const department = await prisma.department.findFirst({
            where: { department: params.id },
        })

        if (!department) {
            return NextResponse.json(
                { message: "Department not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(department)
    } catch (error) {
        console.error("Failed to fetch department:", error)
        return NextResponse.json(
            { message: "Failed to fetch department" },
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
        const { department } = body

        if (!department) {
            return NextResponse.json(
                { message: "Department name is required" },
                { status: 400 }
            )
        }

        const existingDepartment = await prisma.department.findFirst({
            where: { department },
        })

        if (existingDepartment && existingDepartment.department !== params.id) {
            return NextResponse.json(
                { message: "Department already exists" },
                { status: 400 }
            )
        }

        const updatedDepartment = await prisma.department.update({
            where: { department: params.id },
            data: { department },
        })

        return NextResponse.json(updatedDepartment)
    } catch (error) {
        console.error("Failed to update department:", error)
        return NextResponse.json(
            { message: "Failed to update department" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const department = await prisma.department.findFirst({
            where: { department: params.id },
            // include: { staff: true },
        })

        if (!department) {
            return NextResponse.json(
                { message: "Department not found" },
                { status: 404 }
            )
        }

        // if (department.staff.length > 0) {
        //     return NextResponse.json(
        //         { message: "Cannot delete department with associated staff" },
        //         { status: 400 }
        //     )
        // }

        await prisma.department.delete({
            where: { department: params.id },
        })

        return NextResponse.json({ message: "Department deleted successfully" })
    } catch (error) {
        console.error("Failed to delete department:", error)
        return NextResponse.json(
            { message: "Failed to delete department" },
            { status: 500 }
        )
    }
} 