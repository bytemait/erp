import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from "@/types/apiResponse";
import {
  errorResponse,
  successResponse,
  failureResponse,
} from "@/utils/response";
import { Admin } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Admin | null>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const profile = await prisma.admin.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!profile) {
      return NextResponse.json(errorResponse(404, "User profile not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      successResponse(200, profile, "Profile fetched successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Admin | null>>> {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }
    if (!data) {
      return NextResponse.json(errorResponse(400, "Data is required"), {
        status: 400,
      });
    }

    const updatedProfile = await prisma.admin.update({
      where: { id: String(id) },
      data,
    });

    if (!updatedProfile) {
      return NextResponse.json(errorResponse(404, "User profile not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      successResponse(200, updatedProfile, "Profile updated successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "id is required"), {
        status: 400,
      });
    }

    await prisma.admin.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      successResponse(200, null, "Profile deleted successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
