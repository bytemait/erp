import { ApiResponse } from "@/types/apiResponse";

export const successResponse = <T>(
    status = 200,
    data: T,
    message = "Success",
): ApiResponse<T> => ({
    success: true,
    status,
    data,
    message,
});

export const errorResponse = <T>(
    status = 400,
    message = "Bad Request",
): ApiResponse<T> => ({
    success: false,
    status,
    message,
});

export const failureResponse = (
    message = "Server Error Ocurred",
): ApiResponse<null> => ({
    success: false,
    status: 500,
    message,
});