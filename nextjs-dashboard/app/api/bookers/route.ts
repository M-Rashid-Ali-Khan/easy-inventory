import { NextResponse } from "next/server";

type Address = {
  street: string;
  city: string;
  province: string;
};

type Booker = {
  _id: string;
  name: string;
  phone: string;
  cnic: string;
  address: Address;
  joinedAt: string;
};

// Fake in-memory DB for demo
let bookers: Booker[] = [];

// GET /api/bookers
export async function GET() {
  return NextResponse.json(bookers);
}

// POST /api/bookers
export async function POST(req: Request) {
  const data = await req.json();

  const newBooker: Booker = {
    _id: data.id || Date.now().toString(), // unique id as string
    name: data.name,
    phone: data.phone,
    cnic: data.cnic,
    address: {
      street: data.address?.street || "",
      city: data.address?.city || "",
      province: data.address?.province || "",
    },
    joinedAt: new Date().toISOString().split("T")[0],
  };

  bookers.push(newBooker);
  return NextResponse.json(newBooker, { status: 201 });
}

// DELETE /api/bookers?id=123
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  bookers = bookers.filter((b) => b._id !== id);
  return NextResponse.json({ success: true });
}

// PUT /api/bookers?id=123
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  console.log("Received PUT for id:", id);
  const data = await req.json();

  bookers = bookers.map((b) =>
    b._id === id
      ? {
          ...b,
          ...data,
          address: {
            street: data.address?.street ?? b.address.street,
            city: data.address?.city ?? b.address.city,
            province: data.address?.province ?? b.address.province,
          },
        }
      : b
  );

  return NextResponse.json({ success: true });
}
