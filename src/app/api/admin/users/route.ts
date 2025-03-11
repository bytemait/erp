export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";
import bcrypt from "bcryptjs";

// POST request to create a new user
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		console.log("Request Body:", body);

		const { username, email, password, role } = body;

		if (!username || !email || !password || !role) {
			return NextResponse.json(
				errorResponse(
					400,
					"Username, email, password, and role are required"
				),
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				errorResponse(400, "Password must be at least 6 characters"),
				{ status: 400 }
			);
		}

		if (!email.includes("@")) {
			return NextResponse.json(
				errorResponse(400, "Invalid email address"),
				{ status: 400 }
			);
		}

		// Check if the user already exists
		const userExisted = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (userExisted) {
			return NextResponse.json(
				errorResponse(400, "User already exists"),
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		let newUser;
		if (role === "ADMIN") {
			newUser = await prisma.admin.create({
				data: {
					name: username,
					email: email,
					password: hashedPassword,
				},
			});
			
		} else if (role === "STAFF") {
			newUser = await prisma.staff.create({
				data: {
					name: username,
					email: email,
					password: hashedPassword,
				},
			});
		} else {
			return NextResponse.json(errorResponse(400, "Invalid role"), {
				status: 400,
			});
		}

		await prisma.user.create({
			data: {
				userId: newUser.id,
				email: email,
				role: role,
				name: username,
			},
		});

		return NextResponse.json(
			successResponse(201, newUser, `${role} created successfully`),
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST Error:", error);

		const errorMessage =
			error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), {
			status: 500,
		});
	}
}

// GET request to fetch all users
export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: {
				userId: true,
				email: true,
				role: true,
				name: true,
			},
		});

		if (!users) {
			return NextResponse.json(errorResponse(404, "No users found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, users), { status: 200 });
	} catch (error) {
		console.error("GET Error:", error);

		const errorMessage =
			error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), {
			status: 500,
		});
	}
}
