import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

const isValidBatch = (batch: string) => {
	return /^\d{4}$/.test(batch) && parseInt(batch) > 2000;
};

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { batch } = body;

		if (!batch) {
			return NextResponse.json(errorResponse(400, "Batch name is required"), {
				status: 400,
			});
		}

		if (!isValidBatch(batch)) {
			return NextResponse.json(
				errorResponse(400, "Batch must be a valid year (4 digits) after 2000"),
				{ status: 400 }
			);
		}

		const batchExists = await prisma.batch.findUnique({ where: { batch } });
		if (batchExists) {
			return NextResponse.json(errorResponse(409, "Batch already exists"), {
				status: 409,
			});
		}

		const newBatch = await prisma.batch.create({
			data: { batch },
		});

		return NextResponse.json(
			successResponse(201, newBatch, "Batch created successfully"),
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}

export async function GET() {
	try {
		const batches = await prisma.batch.findMany({
			include: { students: true },
		});

		if (!batches) {
			return NextResponse.json(errorResponse(404, "No batches found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, batches, "Batches retrieved successfully"), {
			status: 200,
		});
	} catch (error) {
		console.error("GET Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}