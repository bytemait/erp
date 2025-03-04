"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, FileText, Settings, Check, LucideIcon, Users, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const iconsMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    FileText,
    Settings,
    Check,
    Users,
    Send,
};

interface NavItem {
    name: string;
    href: string;
    icon: string;
}

interface SidenavProps {
    navItems: NavItem[];
}

export function Sidenav({ navItems }: SidenavProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "flex flex-col border-r transition-all duration-300",
                isCollapsed ? "w-16 px-1" : "w-64 px-3"
            )}
        >
            <div className="pb-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <Menu className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">Menu</span>}
                </Button>
            </div>
            <ul className="space-y-2 py-4">
                {navItems.map((item) => {
                    const IconComponent = iconsMap[item.icon];

                    return (
                        <li key={item.name}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center py-2 px-4 text-sm font-medium rounded-lg",
                                                pathname === item.href
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {IconComponent && <IconComponent className="h-5 w-5" />}
                                            {!isCollapsed && <span className="ml-3">{item.name}</span>}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}