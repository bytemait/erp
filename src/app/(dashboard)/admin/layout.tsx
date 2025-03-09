import React from "react";
import type { Metadata } from "next";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";

const navItems = [
	{ name: "Home", href: "/admin", icon: "LayoutDashboard" },
	{ name: "Users", href: "/admin/users", icon: "Users" },
	{ name: "Announcements", href: "/admin/announcements", icon: "Send" }, 
	{ name: "Configure", href: "/admin/configure", icon: "Check" },
	{ name: "UI Settings", href: "/documents", icon: "Settings" }
];

export const metadata: Metadata = {
	title: "Admin | ERP",
	description: "ERP for MAIT",
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen flex-col">
			<Topnav />
			<div className="flex flex-1 overflow-hidden">
				<Sidenav navItems={navItems} />
				<main className="flex-1 overflow-y-auto p-4">
					{children}
				</main>
			</div>
		</div>
	);
}
