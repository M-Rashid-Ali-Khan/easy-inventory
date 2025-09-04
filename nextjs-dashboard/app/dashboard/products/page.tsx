// pages/products.tsx
"use client";
import React from "react";
import TablePage from "@/app/ui/TablePage";
import { Column, TextCell, NonEditableCell } from "@/app/ui/tables";

// ### Product type
type Product = {
  _id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  unit: string;
  active: boolean;
  companyId: string;
  createdAt: string;
};

const columns: Column<Product>[] = [
  { key: "name", header: "Name", render: TextCell },
  { key: "sku", header: "SKU", render: TextCell },
  { key: "category", header: "Category", render: TextCell },
  { key: "unitPrice", header: "Unit Price", render: TextCell },
  { key: "unit", header: "Unit", render: TextCell },
  { key: "active", header: "Active", render: TextCell },
  { key: "companyId", header: "Company ID", render: TextCell },
  { key: "createdAt", header: "Created At", render: NonEditableCell },
];

const emptyProduct: Product = {
  _id: "",
  name: "",
  sku: "",
  category: "",
  unitPrice: 0,
  unit: "",
  active: true,
  companyId: "",
  createdAt: new Date().toISOString(),
};

export default function ProductsPage() {
  return (
    <TablePage<Product>
      title="Products Page"
      apiPath="/api/products"
      columns={columns}
      emptyRow={emptyProduct}
      renderForm={(row, setRow) => (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="SKU"
            value={row.sku}
            onChange={(e) => setRow({ ...row, sku: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={row.category}
            onChange={(e) => setRow({ ...row, category: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={row.unitPrice}
            onChange={(e) =>
              setRow({ ...row, unitPrice: parseFloat(e.target.value) })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Unit"
            value={row.unit}
            onChange={(e) => setRow({ ...row, unit: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            value={row.active ? "true" : "false"}
            onChange={(e) =>
              setRow({ ...row, active: e.target.value === "true" })
            }
            className="border p-2 w-full"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <input
            type="text"
            placeholder="Company ID"
            value={row.companyId}
            onChange={(e) => setRow({ ...row, companyId: e.target.value })}
            className="border p-2 w-full"
          />
        </form>
      )}
    />
  );
}
