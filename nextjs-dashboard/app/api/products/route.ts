import { NextResponse } from "next/server";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  companyId: string; // reference to ProducerCompany
  createdAt: string;
};

// Fake in-memory DB for demo
let products: Product[] = [
  {
    _id: "prd01",
    name: "Surf Excel",
    category: "Detergent",
    price: 250,
    companyId: "cmp01", // Unilever
    createdAt: "2025-08-10",
  },
  {
    _id: "prd02",
    name: "Nescafe",
    category: "Beverages",
    price: 800,
    companyId: "cmp02", // Nestle
    createdAt: "2025-08-15",
  },
  {
    _id: "prd03",
    name: "Olpers Milk",
    category: "Dairy",
    price: 180,
    companyId: "cmp03", // Engro
    createdAt: "2025-08-22",
  },
];

// GET /api/products
export async function GET() {
  return NextResponse.json(products);
}

// POST /api/products
export async function POST(req: Request) {
  const data = await req.json();

  const newProduct: Product = {
    _id: data.id || Date.now().toString(),
    name: data.name,
    category: data.category,
    price: data.price,
    companyId: data.companyId,
    createdAt: new Date().toISOString().split("T")[0],
  };

  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}

// DELETE /api/products?id=prd01
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  products = products.filter((p) => p._id !== id);
  return NextResponse.json({ success: true });
}

// PUT /api/products?id=prd01
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await req.json();

  products = products.map((p) =>
    p._id === id
      ? {
          ...p,
          ...data,
          name: data.name ?? p.name,
          category: data.category ?? p.category,
          price: data.price ?? p.price,
          companyId: data.companyId ?? p.companyId,
        }
      : p
  );

  return NextResponse.json({ success: true });
}
