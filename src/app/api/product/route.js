import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/lib/db";
import { ProductModel } from "@/backend/models/ProductModels";

export async function GET() {
  try {
    await dbConnect();

    const products = await ProductModel.find({ isDeleted: false }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


