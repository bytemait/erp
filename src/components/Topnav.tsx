"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

const profileItems = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
]

export function Topnav() {
    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <div className="text-xl font-bold">ERP MAIT</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">ishaanminocha</p>
                            <p className="text-xs leading-none text-muted-foreground">i@i.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({
                        redirectTo: "/",
                    })}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}