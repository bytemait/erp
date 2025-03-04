"use client"

import { Menucard } from "@/components/Menucard";
import { Users, Send, Check, Settings } from "lucide-react"

export default function AdminPage() {

    const functionCards = [
        {
            title: "User Management",
            description: "Manage your users and their roles",
            icon: Users,
            color: "bg-slate-500",
            route: "admin/users"
        },
        {
            title: "Send Announcement",
            description: "Send an announcement to users",
            icon: Send,
            color: "bg-slate-500",
            route: "admin/announcements"
        },
        {
            title: "Configure",
            description: "Configure your application structure",
            icon: Check,
            color: "bg-slate-500",
            route: "admin/uisettings"
        },
        {
            title: "UI Settings",
            description: "Manage your application UI settings",
            icon: Settings,
            color: "bg-slate-500",
            route: "admin/uisettings"
        },
        // {
        //     title: "Email",
        //     description: "Manage your email communications",
        //     icon: Mail,
        //     color: "bg-slate-500",
        //     route: "/admin/email"
        // },
        // {
        //     title: "Calendar",
        //     description: "Schedule and manage your events",
        //     icon: Calendar,
        //     color: "bg-slate-500",
        //     route: "/admin/calendar"
        // },
        // {
        //     title: "Invoices",
        //     description: "Create and manage your invoices",
        //     icon: CreditCard,
        //     color: "bg-slate-500",
        //     route: "/admin/invoices"
        // },
        // {
        //     title: "Analytics",
        //     description: "View detailed analytics and reports",
        //     icon: LineChart,
        //     color: "bg-slate-500",
        //     route: "/admin/analytics"
        // },
    ]

    return (
        <>
            <Menucard functions={functionCards} />
        </>
    );
}