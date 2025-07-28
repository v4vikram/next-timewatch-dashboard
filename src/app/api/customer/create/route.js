// app/api/lead/route.js
import { dbConnect } from "@/backend/lib/db";
import { CustomerModel } from "@/backend/models/CustomerModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const lead = await CustomerModel.create(body);
  return NextResponse.json({ success: true, lead });
}

export async function GET() {
  await dbConnect();
  const leads = await CustomerModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, leads });
}
