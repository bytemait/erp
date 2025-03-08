import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// Handle GET request
export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();

    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Error in GET UI Settings API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle PUT request
export async function PUT(req: NextRequest) {
  console.log("PUT request received");
  try {
    const body = await req.json();
    console.log("Request Body:", body);
    const {
      isThemeSelectable,
      theme,
      backgroundColor,
      primaryColor,
      secondaryColor,
      borderRadius,
      fontSize,
      fontWeight,
      headingFont,
      textFont,
    } = body;

    // Check if any field is provided
    if (
      isThemeSelectable === undefined &&
      !theme &&
      !backgroundColor &&
      !primaryColor &&
      !secondaryColor &&
      !borderRadius &&
      !fontSize &&
      !fontWeight &&
      !headingFont &&
      !textFont
    ) {
      return NextResponse.json({ error: "No fields provided for update" }, { status: 400 });
    }

    // Update the settings (assuming there's only one settings row)
    const updatedSettings = await prisma.settings.updateMany({
      data: {
        isThemeSelectable,
        theme,
        backgroundColor,
        primaryColor,
        secondaryColor,
        borderRadius,
        fontSize,
        fontWeight,
        headingFont,
        textFont,
      },
    });

    if (updatedSettings.count === 0) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Settings updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT UI Settings API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}