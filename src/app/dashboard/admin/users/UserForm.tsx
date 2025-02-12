import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { userLoginSchema } from "@/validations/schemas/login";

interface FormData {
	username: string;
	password: string;
	role: string;
}

interface UserFormProps {
    onClose: () => void;
    formLabel : string;
}

function UserForm({ onClose , formLabel }: UserFormProps) {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
		role: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRoleChange = (value: string) => {
		setFormData((prev) => ({ ...prev, role: value }));
	};


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

		userLoginSchema.parse(formData);
    };



	return (
		<>
			<h2 className="text-2xl font-bold mb-4">{`${formLabel} User`}</h2>
			<form onSubmit={submitHandler} className="space-y-4">
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
                        readOnly={(formLabel === 'Edit' || formLabel === 'Delete')}
					/>
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<Label htmlFor="role">Role</Label>
					<Select
						onValueChange={handleRoleChange}
						value={formData.role}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="user">User</SelectItem>
							<SelectItem value="admin">Admin</SelectItem>
							<SelectItem value="moderator">Moderator</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">{formLabel}</Button>
				</div>
			</form>
		</>
	);
}

export default UserForm;
