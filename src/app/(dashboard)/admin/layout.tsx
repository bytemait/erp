import React from "react";
import type { Metadata } from "next";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";

const navItems = [
	{ name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
	{ name: "Documents", href: "/documents", icon: "FileText" },
	{ name: "Settings", href: "/settings", icon: "Settings" },
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
