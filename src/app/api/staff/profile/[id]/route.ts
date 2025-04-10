import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from "@/types/apiResponse";
import {
  errorResponse,
  successResponse,
  failureResponse,
} from "@/utils/response";
import { Staff } from "@prisma/client";
import bcrypt from "bcryptjs";
import { env } from "@/utils/consts";

export async function GET(
  req: NextRequest,
	{ params }: { params: Promise<{ id : string }> }
): Promise<NextResponse<ApiResponse<Staff | null>>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const profile = await prisma.staff.findUnique({
      where: {
        id: String(id),
      },
      include: {
        staff: true,
      },
    });

    if (!profile) {
      return NextResponse.json(errorResponse(404, "User profile not found"), {
        status: 404,
      });
    }

    profile.password = "HIDDEN";

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
	{ params }: { params: Promise<{ id : string }> }
): Promise<NextResponse<ApiResponse<Staff | null>>> {
  try {
    const { id } = await params;
    const data = await req.json();
    const new_password = data.new_password;
    const old_password = data.old_password;
    const password= data.password;

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

    if (password)
    {
      return NextResponse.json(errorResponse(400, "Password cannot be updated here"), {
        status: 400,
      });
    }

    if (new_password || old_password) 
    {
      const profile = await prisma.staff.findUnique({
        where: { id: String(id) },
      });
      if (!profile) {
        return NextResponse.json(errorResponse(404, "Staff profile not found"), {
          status: 404,
        });
      }

      const password_check = await bcrypt.compare(old_password, profile.password);
      if (!password_check) {
        return NextResponse.json(errorResponse(400, "Old password is incorrect"), {
          status: 400,
        });
      }

      const salt = await bcrypt.genSalt(env.saltRounds);
      const hash = await bcrypt.hash(new_password, salt);

      const updateProfilePassword = await prisma.staff.update({
        where: { id: String(id) },
        data: { password: hash },
      });
      
      if (!updateProfilePassword) {
        return NextResponse.json(errorResponse(404, "Password not updated"), {
          status: 404,
        });
      }

      updateProfilePassword.password = "HIDDEN";

      return NextResponse.json(
        successResponse(200, updateProfilePassword, "Password updated successfully"),
        { status: 200 }
      );
    } 
    else 
    {
      const updatedProfile = await prisma.staff.update({
        where: { id: String(id) },
        data: {
          name: data.name,
          email: data.email,
        },
      });

      const userupdatedProfile = await prisma.user.updateMany({
        where: { userId: String(id) },
        data: {
          name: data.name,
          email: data.email,
        },
      });

      if (!updatedProfile) {
        return NextResponse.json(errorResponse(404, "Staff profile not found"), {
          status: 404,
        });
      }

      if (!userupdatedProfile) {
        return NextResponse.json(errorResponse(404, "User profile not found"), {
          status: 404,
        });
      }

      updatedProfile.password = "HIDDEN";

      return NextResponse.json(
        successResponse(200, updatedProfile, "Profile updated successfully"),
        { status: 200 }
      );
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
	{ params }: { params: Promise<{ id : string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "id is required"), {
        status: 400,
      });
    }

    await prisma.staff.delete({
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
