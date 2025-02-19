"use client"

import Link from "next/link"
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useEffect, useState } from "react"

interface Notifications {
    id: number;
    title: string;
    message: string;
}

export function NotificationPanel() {

    const [notifications, setNotifications] = useState<Notifications[]>([])


    useEffect(() => {
        const getNotifications = async () => {
            const response = await axios.get("/api/public/notification");
            // console.log(response.data)
            setNotifications(response.data.data)
        }
        getNotifications();
    }, [])

    return (

        <DropdownMenuContent className="w-80" align="end" forceMount>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? notifications?.map((item) => (
                <DropdownMenuItem key={item.id} className="flex flex-col items-start py-2">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.message}</span>
                </DropdownMenuItem>
            )) : (
                <div className="py-5 text-center">
                    <span className="text-md">you have no new notifications</span>
                </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/activity" className="w-full text-center">
                    View all notifications
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}