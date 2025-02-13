"use client"
import { Menucard } from "@/components/Menucard";
import { Mail, Calendar, CreditCard, LineChart , User} from "lucide-react"

export default function AdminPage() {

    const functionCards = [
        {
            title: "Email",
            description: "Manage your email communications",
            icon: Mail,
            color: "bg-slate-500",
            route: "/admin/email"
        },
        {
            title: "Calendar",
            description: "Schedule and manage your events",
            icon: Calendar,
            color: "bg-slate-500",
            route: "/admin/calendar"
        },
        {
            title: "Invoices",
            description: "Create and manage your invoices",
            icon: CreditCard,
            color: "bg-slate-500",
            route: "/admin/invoices"
        },
        {
            title: "Analytics",
            description: "View detailed analytics and reports",
            icon: LineChart,
            color: "bg-slate-500",
            route: "/admin/analytics"
        },
        {
            title :"User Management",
            description :"Manage your users and their roles",
            icon : User,
            color : "bg-slate-500",
            route : "admin/users"
        }
    ]

    return (
        <>
            <Menucard functions={functionCards} />
        </>
    );
}