import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

type BatchParams = { id: string };

export async function GET(req: NextRequest, { params }: { params: BatchParams }) {
	try {
		const { id: batch } = params;

		if (!batch) {
			return NextResponse.json(errorResponse(400, "Batch name is required"), {
				status: 400,
			});
		}

		const batchData = await prisma.batch.findUnique({
			where: { batch },
			include: { students: true },
		});

		if (!batchData) {
			return NextResponse.json(errorResponse(404, "Batch not found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, batchData, "Batch found"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

export async function PUT(req: NextRequest, { params }: { params: BatchParams }) {
	try {
		const { id: batch } = params;
		const body = await req.json();
		const { batch: newBatchName } = body;

		console.log(params)

		console.log(batch, newBatchName);

		if (!batch || !newBatchName) {
			return NextResponse.json(errorResponse(400, "Both old and new batch names are required"), {
				status: 400,
			});
		}

		if (!/^\d{4}$/.test(newBatchName) || parseInt(newBatchName) <= 2000) {
			return NextResponse.json(errorResponse(400, "Batch must be a valid year after 2000"), {
				status: 400,
			});
		}

		const batchExists = await prisma.batch.findUnique({ where: { batch } });
		if (!batchExists) {
			return NextResponse.json(errorResponse(404, "Batch not found"), {
				status: 404,
			});
		}

		const updatedBatch = await prisma.batch.update({
			where: { batch },
			data: { batch: newBatchName },
		});

		return NextResponse.json(successResponse(200, updatedBatch, "Batch updated successfully"), {
			status: 200,
		});
	} catch (err) {
		console.error("PUT Error:", err);
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: BatchParams }) {
	try {
		const { id: batch } = params;

		if (!batch) {
			return NextResponse.json(errorResponse(400, "Batch name is required"), {
				status: 400,
			});
		}

		const batchExists = await prisma.batch.findUnique({ where: { batch } });
		if (!batchExists) {
			return NextResponse.json(errorResponse(404, "Batch not found"), {
				status: 404,
			});
		}

		await prisma.batch.delete({ where: { batch } });

		return NextResponse.json(successResponse(200, null, "Batch deleted successfully"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}