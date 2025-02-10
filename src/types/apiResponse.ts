export interface ApiResponse<T> {
    data: T | undefined
    success: boolean | undefined
    message: string | undefined
}