import { Role } from "@prisma/client"

export interface Announcement {
    id: number
    title: string
    message: string
    role: Role
    filters: {
        batch?: string[]
        group?: string[]
        branch?: string[]
        staffType?: string[]
        designation?: string[]
        department?: string[]
    }
}