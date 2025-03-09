import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"

export async function GET() {
    try {
        const departments = await prisma.department.findMany({
            select: {
                department: true,
                // staff: true,
            },
        })
        return NextResponse.json(departments)
    } catch (error) {
        console.error("Failed to fetch departments:", error)
        return NextResponse.json(
            { message: "Failed to fetch departments" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
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

        if (existingDepartment) {
            return NextResponse.json(
                { message: "Department already exists" },
                { status: 400 }
            )
        }

        const newDepartment = await prisma.department.create({
            data: { department },
        })

        return NextResponse.json(newDepartment)
    } catch (error) {
        console.error("Failed to create department:", error)
        return NextResponse.json(
            { message: "Failed to create department" },
            { status: 500 }
        )
    }
}