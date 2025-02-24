import React, { useState } from "react";
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

import { toast } from "react-hot-toast";
import { userLoginSchema } from "@/validations/schemas/login";

interface User {
    userId: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserFormProps {
    onClose: () => void;
    formLabel: string;
    userData: User | null;
}

function UserForm({ onClose, formLabel, userData }: UserFormProps) {

    const [formData, setFormData] = useState<User>({
        userId: userData?.userId || "",
        name: userData?.name || "",
        email: userData?.email || "",
        password: userData?.password || "",
        role: userData?.role || "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


		const result = userLoginSchema.safeParse({
			name: formData.name,
			email: formData.email,
			password: formLabel == "Edit" ? undefined :  formData.password,
		});

	

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            toast.error(fieldErrors[Object.keys(fieldErrors)[0]]);
            return;
        }

        try {


            const data = {
                username: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            };

            const response = await fetch(
                `/api/admin/users${formLabel === "Edit" ? `/${userData?.userId}` : ""}`,
                {
                    method: formLabel === "Edit" ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const resData = await response.json();
            if (!response.ok) {
                toast.error(resData.message);
            } else {
                toast.success(resData.message);
                onClose();
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">{`${formLabel} User`}</h2>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                    )}
                </div>
                {formLabel !== "Edit" && (
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-500">{errors.password}</p>
                        )}
                    </div>
                )}
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
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="STAFF">Staff</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.role && (
                        <p className="text-red-500">{errors.role}</p>
                    )}
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
