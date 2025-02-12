"use client";
import React, { useState } from "react";
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

function UserMangementPage() {
	
	const [isOpen, setIsOpen] = useState(false);
	const [type , setType] = useState('');
	


	const modalOpenCloseHandler = () => {
		setIsOpen(!isOpen);
	};
	const handleLabelClick = (type : string) => {
		setType(type);
		
		modalOpenCloseHandler();
		

	}

	

	function actionColumn() {
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
					<DropdownMenuItem onClick={() => handleLabelClick('Edit')}>
						EDIT
					</DropdownMenuItem>
					<DropdownMenuItem onClick={()=> handleLabelClick("Delete")}>DELETE</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	const dummyData = [
		{ id: "32423444", name: "KushAheer", department: "CST", role: "Admin" },
		{ id: "32423445", name: "JohnDoe", department: "ECE", role: "User" },
		{
			id: "32423446",
			name: "JaneSmith",
			department: "EEE",
			role: "Moderator",
		},
		{
			id: "32423447",
			name: "AliceJohnson",
			department: "ME",
			role: "Admin",
		},
		{ id: "32423448", name: "BobBrown", department: "CE", role: "User" },
	];

	return (
		<>	
			<div className="flex justify-between items-center mb-4 flex-row-reverse">

				<Button onClick={()=>handleLabelClick("Create")}>Create</Button>
			</div>
			{isOpen && (
				<Modal onClose={modalOpenCloseHandler}>
					<UserForm onClose={modalOpenCloseHandler} formLabel={type} />
				</Modal>
			)}{" "}
			
			<Table>
				<TableCaption>A list of Users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Full Name</TableHead>
						<TableHead>Department</TableHead>
						<TableHead className="text-right">Role</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dummyData.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.department}</TableCell>
							<TableCell className="text-right">
								{user.role}{" "}
							</TableCell>
							<TableCell className="text-right">
								{actionColumn()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			
		</>
	);
}

export default UserMangementPage;
