"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface FunctionData {
    title: string
    description: string
    icon: LucideIcon
    color: string
    route: string
}

interface FunctionCardGridProps {
    functions: FunctionData[]
}

interface FunctionCardProps {
    title: string
    description: string
    icon: LucideIcon
    color: string
    route: string
}

export function Menucard({ functions }: FunctionCardGridProps) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {functions.map((func, index) => (
                <FunctionCard key={index} {...func} />
            ))}
        </div>
    )
}

function FunctionCard({ title, description, icon: Icon, color, route }: FunctionCardProps) {

    const router = useRouter();
    const handleClick = (route: string) => {
        router.push(route);
    }

    return (
        <Card
            className="overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() => route && handleClick(route)}>
            <CardHeader className={`text-white ${color}`}>
                <div className="flex items-center space-x-2">
                    <Icon className="h-6 w-6" />
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}