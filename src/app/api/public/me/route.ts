import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";
import { getServerToken } from "@/utils/session";
import { ApiResponse } from "@/types/apiResponse";
import { User } from "@/types/user";
import { getUserAndChildByEmail } from "@/utils/extract";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<User | null>>> {
    try {
        const token = await getServerToken(req);
        if (!token || !token?.email) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });
        const userDetails = await getUserAndChildByEmail(token.email);
        return NextResponse.json(successResponse(200, userDetails, "User fetched"), { status: 200 });
    } catch (err) {
        return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
    }
}