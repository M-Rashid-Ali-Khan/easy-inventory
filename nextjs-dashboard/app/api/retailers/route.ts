import { NextResponse } from "next/server";

type Address = {
  street: string;
  city: string;
  province: string;
};

type Retailer = {
  _id: string;
  name: string;
  ownerName: string;
  phone: string;
  address: Address;
  createdAt: string;
};

// Fake in-memory DB for demo
// let retailers: Retailer[] = [];

let retailers: Retailer[] = [
  {
    _id: "2001697148722",
    name: "Tech Hub",
    ownerName: "Ahmed Malik",
    phone: "0301-9988776",
    address: {
      street: "101 IT Tower",
      city: "Lahore",
      province: "Punjab",
    },
    createdAt: "2025-08-15",
  },
  {
    _id: "2001697148723",
    name: "City Mart",
    ownerName: "Farah Javed",
    phone: "0322-4455667",
    address: {
      street: "Block B, Gulshan",
      city: "Karachi",
      province: "Sindh",
    },
    createdAt: "2025-08-18",
  },
  {
    _id: "2001697148724",
    name: "Electro World",
    ownerName: "Hassan Tariq",
    phone: "0333-7788990",
    address: {
      street: "Mall Road",
      city: "Faisalabad",
      province: "Punjab",
    },
    createdAt: "2025-08-28",
  },
];

// GET /api/retailers
export async function GET() {
  return NextResponse.json(retailers);
}

// POST /api/retailers
export async function POST(req: Request) {
  const data = await req.json();

  const newRetailer: Retailer = {
    _id: data.id || Date.now().toString(),
    name: data.name,
    ownerName: data.ownerName,
    phone: data.phone,
    address: {
      street: data.address?.street || "",
      city: data.address?.city || "",
      province: data.address?.province || "",
    },
    createdAt: new Date().toISOString().split("T")[0],
  };

  retailers.push(newRetailer);
  return NextResponse.json(newRetailer, { status: 201 });
}

// DELETE /api/retailers?id=123
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  retailers = retailers.filter((r) => r._id !== id);
  return NextResponse.json({ success: true });
}

// PUT /api/retailers?id=123
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await req.json();

  retailers = retailers.map((r) =>
    r._id === id
      ? {
          ...r,
          ...data,
          address: {
            street: data.address?.street ?? r.address.street,
            city: data.address?.city ?? r.address.city,
            province: data.address?.province ?? r.address.province,
          },
        }
      : r
  );

  return NextResponse.json({ success: true });
}
