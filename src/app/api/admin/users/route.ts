import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from '@/types/apiResponse';
import { errorResponse, successResponse, failureResponse } from "@/utils/response";
import { Admin, Student, Faculty, Staff } from "@prisma/client";

// Function to handle BigInt serialization
function serializeBigInt<T>(obj: T): T {
    return JSON.parse(
      JSON.stringify(obj, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }

// POST request to create a new user
  export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Admin | Faculty | Student | Staff | null>>> {
    try {
      const body = await req.json();
  
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(errorResponse(400, "Request body cannot be empty"), { status: 400 });
      }
  
      const { userType, ...userData } = body; // Extracting user type (Admin, Student, Faculty, Staff)
  
      if (!userType) {
        return NextResponse.json(errorResponse(400, "User type is required"), { status: 400 });
      }
  
      let newUser: Admin | Faculty | Student | Staff | null = null;
  
      switch (userType) {
        case "Admin":
          newUser = await prisma.admin.create({ data: userData }) as Admin;
          break;
        case "Student":
          newUser = await prisma.student.create({ data: userData }) as Student;
          break;
        case "Faculty":
          newUser = await prisma.faculty.create({ data: userData }) as Faculty;
          break;
        case "Staff":
          newUser = await prisma.staff.create({ data: userData }) as Staff;
          break;
        default:
          return NextResponse.json(errorResponse(400, "Invalid user type"), { status: 400 });
      }
  
      return NextResponse.json(
        successResponse(201, serializeBigInt(newUser), `${userType} created successfully`),
        { status: 201 }
      );
    } catch (err) {
      console.error("POST Error:", err);
      const error = err instanceof Error ? err.message : String(err);
      return NextResponse.json(failureResponse(error), { status: 500 });
    }
  }