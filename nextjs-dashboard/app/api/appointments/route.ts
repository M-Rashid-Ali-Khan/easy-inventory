import { NextRequest, NextResponse } from "next/server";

let appointments: any[] = [];

export async function GET() {
  return NextResponse.json({ appointments });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || !Array.isArray(data.appointments)) {
      return NextResponse.json(
        { error: "Invalid appointments array" },
        { status: 400 }
      );
    }

    // Replace or update appointments
    appointments = data.appointments;

    return NextResponse.json({ success: true, appointments });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Failed to store appointments" }, { status: 500 });
  }
}
