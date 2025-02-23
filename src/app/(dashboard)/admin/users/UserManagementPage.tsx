"use client";
import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Modal from "@/components/Modal";
import UserForm from "./UserForm";
import axios from "axios";

interface User {
	userId: string;
	name: string;
	email: string;
	password: string;
	role: string;
}

function UserMangementPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const modalOpenCloseHandler = () => {
		setIsOpen(!isOpen);
	};
	const handleLabelClick = (type: string, user?: User) => {
		setType(type);

		setSelectedUser(user || null);

		modalOpenCloseHandler();
	};
	const handleDelete = async (userId: string) => {
		try {
			await axios.delete(`/api/admin/users/${userId}`);
			setUsers(users.filter((user) => user.userId !== userId));
		} catch (error) {
			console.error("DELETE Error:", error);
		}
	};

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("/api/admin/users");
				const data = await response.data;
				setUsers(data.data);
				console.log(data.data);
			} catch (error) {
				console.error("GET Error:", error);
			}
		};
		getUsers();
	}, [selectedUser ,isOpen]);

	function actionColumn(user: User) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleLabelClick("Edit", user)}
					>
						EDIT
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleDelete(user.userId)}>
						DELETE
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<>
			<div className="flex justify-between items-center mb-4 flex-row-reverse">
				<Button onClick={() => handleLabelClick("Create")}>
					Create
				</Button>
			</div>
			{isOpen && (
				<Modal onClose={modalOpenCloseHandler}>
					<UserForm
						userData={selectedUser}
						onClose={modalOpenCloseHandler}
						formLabel={type}
					/>
				</Modal>
			)}{" "}
			<Table>
				<TableCaption>A list of Users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Full Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className="text-right">Role</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((item) => (
						<TableRow key={item.userId}>
							<TableCell>{item.userId}</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell className="text-right">
								{item.role}{" "}
							</TableCell>
							<TableCell className="text-right">
								{actionColumn(item)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default UserMangementPage;
