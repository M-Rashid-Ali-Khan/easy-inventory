import { NextResponse } from "next/server";

type ProducerCompany = {
  _id: string;
  name: string;
  address: string;
  contact: string;
  country: string;
  createdAt: string;
};
// let companies: ProducerCompany[] = []

// Fake in-memory DB for demo
let companies: ProducerCompany[] = [
  {
    _id: "cmp01",
    name: "Unilever Pakistan",
    address: "Karachi, Pakistan",
    contact: "021-1234567",
    country: "Pakistan",
    createdAt: "2025-08-10",
  },
  {
    _id: "cmp02",
    name: "Nestle Pakistan",
    address: "Lahore, Pakistan",
    contact: "042-8899776",
    country: "Pakistan",
    createdAt: "2025-08-15",
  },
  {
    _id: "cmp03",
    name: "Engro Foods",
    address: "Karachi, Pakistan",
    contact: "021-4455667",
    country: "Pakistan",
    createdAt: "2025-08-22",
  },
];

// GET /api/companies
export async function GET() {
  return NextResponse.json(companies);
}

// POST /api/companies
export async function POST(req: Request) {
  const data = await req.json();

  const newCompany: ProducerCompany = {
    _id: data.id || Date.now().toString(),
    name: data.name,
    address: data.address,
    contact: data.contact,
    country: data.country,
    createdAt: new Date().toISOString().split("T")[0],
  };

  companies.push(newCompany);
  return NextResponse.json(newCompany, { status: 201 });
}

// DELETE /api/companies?id=cmp01
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  companies = companies.filter((c) => c._id !== id);
  return NextResponse.json({ success: true });
}

// PUT /api/companies?id=cmp01
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await req.json();

  companies = companies.map((c) =>
    c._id === id
      ? {
          ...c,
          ...data,
          name: data.name ?? c.name,
          address: data.address ?? c.address,
          contact: data.contact ?? c.contact,
          country: data.country ?? c.country,
        }
      : c
  );

  return NextResponse.json({ success: true });
}
