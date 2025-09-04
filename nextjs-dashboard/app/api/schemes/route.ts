// /app/api/schemes/route.ts
import { NextResponse } from "next/server";

type Scheme = {
  _id: string;
  name: string;
  productIds: string[];
  type: "bonus" | "discount" | "bundle";
  rules: {
    buyQty?: number;
    getQty?: number;
    discountPercent?: number;
    discountAmount?: number;
    bundleProducts?: string[];
  };
  applicableTo: {
    companyId?: string;
    retailerIds?: string[];
    region?: string;
    bookerIds?: string[];
  };
  effectiveFrom: string;
  effectiveTo: string;
  active: boolean;
  createdAt: string;
};

// Fake in-memory DB for demo
let schemes: Scheme[] = [
  {
    _id: "sch01",
    name: "August Bonus Offer",
    productIds: ["prd01"],
    type: "bonus",
    rules: { buyQty: 12, getQty: 3 },
    applicableTo: { companyId: "cmp01", region: "Punjab" },
    effectiveFrom: "2025-08-01",
    effectiveTo: "2025-08-31",
    active: true,
    createdAt: "2025-07-15",
  },
  {
    _id: "sch02",
    name: "Back to School Discount",
    productIds: ["prd02"],
    type: "discount",
    rules: { discountPercent: 10 },
    applicableTo: { companyId: "cmp02" },
    effectiveFrom: "2025-08-05",
    effectiveTo: "2025-09-05",
    active: true,
    createdAt: "2025-07-20",
  },
  {
    _id: "sch03",
    name: "Bundle Dairy Pack",
    productIds: ["prd03", "prd01"],
    type: "bundle",
    rules: { discountPercent: 20, bundleProducts: ["prd01", "prd03"] },
    applicableTo: { companyId: "cmp03" },
    effectiveFrom: "2025-08-10",
    effectiveTo: "2025-09-10",
    active: true,
    createdAt: "2025-07-25",
  },
];

// GET /api/schemes
export async function GET() {
  return NextResponse.json(schemes);
}

// POST /api/schemes
export async function POST(req: Request) {
  const data = await req.json();

  const newScheme: Scheme = {
    _id: data.id || Date.now().toString(),
    name: data.name,
    productIds: data.productIds || [],
    type: data.type,
    rules: data.rules || {},
    applicableTo: data.applicableTo || {},
    effectiveFrom: data.effectiveFrom,
    effectiveTo: data.effectiveTo,
    active: data.active ?? true,
    createdAt: new Date().toISOString().split("T")[0],
  };

  schemes.push(newScheme);
  return NextResponse.json(newScheme, { status: 201 });
}

// DELETE /api/schemes?id=sch01
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  schemes = schemes.filter((s) => s._id !== id);
  return NextResponse.json({ success: true });
}

// PUT /api/schemes?id=sch01
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await req.json();

  schemes = schemes.map((s) =>
    s._id === id
      ? {
          ...s,
          ...data,
          name: data.name ?? s.name,
          productIds: data.productIds ?? s.productIds,
          type: data.type ?? s.type,
          rules: data.rules ?? s.rules,
          applicableTo: data.applicableTo ?? s.applicableTo,
          effectiveFrom: data.effectiveFrom ?? s.effectiveFrom,
          effectiveTo: data.effectiveTo ?? s.effectiveTo,
          active: data.active ?? s.active,
        }
      : s
  );

  return NextResponse.json({ success: true });
}
