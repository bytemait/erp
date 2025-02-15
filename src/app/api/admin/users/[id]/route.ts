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

// GET request to fetch user profile
export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse<Admin | Faculty | Student | Staff | null>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "ID is required"), { status: 400 });
    }

    let user: Admin | Faculty | Student | Staff | null = null;
    let userType = ""; // Store the user type for better messaging

    user = await prisma.admin.findUnique({ where: { id } });
    if (user) userType = "Admin";

    if (!user) {
      user = await prisma.student.findUnique({ where: { id }, include: { details: true } });
      if (user) userType = "Student";
    }

    if (!user) {
      user = await prisma.faculty.findUnique({ where: { id }, include: { details: true } });
      if (user) userType = "Faculty";
    }

    if (!user) {
      user = await prisma.staff.findUnique({ where: { id } });
      if (user) userType = "Staff";
    }

    if (!user) {
      return NextResponse.json(errorResponse(404, "User not found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, serializeBigInt(user), `${userType} profile fetched successfully`), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

//PATCH request to update user profile
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<ApiResponse<Admin | Faculty | Student | Staff | null>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "ID is required"), { status: 400 });
    }

    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(errorResponse(400, "Request body cannot be empty"), { status: 400 });
    }

    const { userType, ...updateData } = body; // Extract userType from request

    if (!userType) {
      return NextResponse.json(errorResponse(400, "User type is required"), { status: 400 });
    }

    let updatedUser: Admin | Faculty | Student | Staff | null = null;

    switch (userType) {
      case "Admin":
        updatedUser = await prisma.admin.update({
          where: { id },
          data: updateData,
        }) as Admin;
        break;

      case "Student":
        updatedUser = await prisma.student.update({
          where: { id },
          data: updateData,
        }) as Student;
        break;

      case "Faculty":
        updatedUser = await prisma.faculty.update({
          where: { id },
          data: updateData,
        }) as Faculty;
        break;

      case "Staff":
        updatedUser = await prisma.staff.update({
          where: { id },
          data: updateData,
        }) as Staff;
        break;

      default:
        return NextResponse.json(errorResponse(400, "Invalid user type"), { status: 400 });
    }

    if (!updatedUser) {
      return NextResponse.json(errorResponse(404, "User not found or could not be updated"), { status: 404 });
    }

    return NextResponse.json(
      successResponse(200, serializeBigInt(updatedUser), `${userType} profile updated successfully`),
      { status: 200 }
    );

  } catch (err) {
    console.error("PATCH Error:", err);
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}


// DELETE request to delete a user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "ID is required"), { status: 400 });
    }

    let deletedUser = null;
    let userType = "";

    // Try deleting from different tables
    deletedUser = await prisma.admin.delete({ where: { id } }).catch(() => null);
    if (deletedUser) userType = "Admin";

    if (!deletedUser) {
      deletedUser = await prisma.student.delete({ where: { id } }).catch(() => null);
      if (deletedUser) userType = "Student";
    }

    if (!deletedUser) {
      deletedUser = await prisma.faculty.delete({ where: { id } }).catch(() => null);
      if (deletedUser) userType = "Faculty";
    }

    if (!deletedUser) {
      deletedUser = await prisma.staff.delete({ where: { id } }).catch(() => null);
      if (deletedUser) userType = "Staff";
    }

    if (!deletedUser) {
      return NextResponse.json(errorResponse(404, "User not found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, deletedUser, `${userType} deleted successfully`), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}