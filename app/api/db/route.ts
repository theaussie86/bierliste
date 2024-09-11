import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by <ButtonLead /> component
// Duplicate emails just return 200 OK
export async function GET(req: NextRequest) {
  console.log("GET /api/db");
  console.log(process.env.MONGODB_URI);
  try {
    await connectMongo();

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
