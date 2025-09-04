// app/schemes/page.tsx
"use client";
import React from "react";
import TablePage from "@/app/ui/TablePage";
import { Column, TextCell, NonEditableCell, SelectCell } from "@/app/ui/tables";

// ### Scheme type
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

const columns: Column<Scheme>[] = [
  { key: "name", header: "Name", render: TextCell },
  {
    key: "type",
    header: "Type",
    render: (row, _, isEditing, onChange) =>
      SelectCell(row.type, row, isEditing, onChange, [
        "bonus",
        "discount",
        "bundle",
      ]),
  },
  {
    key: "productIds",
    header: "Products",
    render: (row) => (row.productIds || []).join(", "),
  },
  {
    key: "rules",
    header: "Rules",
    render: (row) => {
      if (row.type === "bonus")
        return `Buy ${row.rules.buyQty} Get ${row.rules.getQty}`;
      if (row.type === "discount") {
        return row.rules.discountPercent
          ? `${row.rules.discountPercent}% off`
          : `Rs ${row.rules.discountAmount} off`;
      }
      if (row.type === "bundle")
        return `Bundle: ${(row.rules.bundleProducts || []).join(", ")}`;
      return "—";
    },
  },
  {
    key: "applicableTo",
    header: "Applicable To",
    render: (row) => {
      const a = row.applicableTo || {};
      const parts = [];
      if (a.companyId) parts.push(`Company: ${a.companyId}`);
      if (a.retailerIds?.length)
        parts.push(`Retailers: ${a.retailerIds.join(", ")}`);
      if (a.region) parts.push(`Region: ${a.region}`);
      if (a.bookerIds?.length)
        parts.push(`Bookers: ${a.bookerIds.join(", ")}`);
      return parts.join(" | ") || "—";
    },
  },
  { key: "effectiveFrom", header: "From", render: TextCell },
  { key: "effectiveTo", header: "To", render: TextCell },
  { key: "active", header: "Active", render: TextCell },
  { key: "createdAt", header: "Created At", render: NonEditableCell },
];

const emptyScheme: Scheme = {
  _id: "",
  name: "",
  productIds: [],
  type: "bonus",
  rules: {},
  applicableTo: {},
  effectiveFrom: new Date().toISOString().slice(0, 10),
  effectiveTo: new Date().toISOString().slice(0, 10),
  active: true,
  createdAt: new Date().toISOString(),
};

export default function SchemesPage() {
  return (
    <TablePage<Scheme>
      title="Schemes Page"
      apiPath="/api/schemes"
      columns={columns}
      emptyRow={emptyScheme}
      renderForm={(row, setRow) => (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
            className="border p-2 w-full"
          />

          <select
            value={row.type}
            onChange={(e) =>
              setRow({ ...row, type: e.target.value as Scheme["type"] })
            }
            className="border p-2 w-full"
          >
            <option value="bonus">Bonus</option>
            <option value="discount">Discount</option>
            <option value="bundle">Bundle</option>
          </select>

          <input
            type="text"
            placeholder="Product IDs (comma separated)"
            value={row.productIds.join(",")}
            onChange={(e) =>
              setRow({
                ...row,
                productIds: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="border p-2 w-full"
          />

          {row.type === "bonus" && (
            <>
              <input
                type="number"
                placeholder="Buy Qty"
                value={row.rules.buyQty || ""}
                onChange={(e) =>
                  setRow({
                    ...row,
                    rules: { ...row.rules, buyQty: parseInt(e.target.value) },
                  })
                }
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Get Qty"
                value={row.rules.getQty || ""}
                onChange={(e) =>
                  setRow({
                    ...row,
                    rules: { ...row.rules, getQty: parseInt(e.target.value) },
                  })
                }
                className="border p-2 w-full"
              />
            </>
          )}

          {row.type === "discount" && (
            <>
              <input
                type="number"
                placeholder="Discount %"
                value={row.rules.discountPercent || ""}
                onChange={(e) =>
                  setRow({
                    ...row,
                    rules: {
                      ...row.rules,
                      discountPercent: parseFloat(e.target.value),
                    },
                  })
                }
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Discount Amount"
                value={row.rules.discountAmount || ""}
                onChange={(e) =>
                  setRow({
                    ...row,
                    rules: {
                      ...row.rules,
                      discountAmount: parseFloat(e.target.value),
                    },
                  })
                }
                className="border p-2 w-full"
              />
            </>
          )}

          {row.type === "bundle" && (
            <input
              type="text"
              placeholder="Bundle Product IDs (comma separated)"
              value={row.rules.bundleProducts?.join(",") || ""}
              onChange={(e) =>
                setRow({
                  ...row,
                  rules: {
                    ...row.rules,
                    bundleProducts: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
              className="border p-2 w-full"
            />
          )}

          <input
            type="date"
            placeholder="Effective From"
            value={row.effectiveFrom}
            onChange={(e) => setRow({ ...row, effectiveFrom: e.target.value })}
            className="border p-2 w-full"
          />

          <input
            type="date"
            placeholder="Effective To"
            value={row.effectiveTo}
            onChange={(e) => setRow({ ...row, effectiveTo: e.target.value })}
            className="border p-2 w-full"
          />

          <select
            value={row.active ? "true" : "false"}
            onChange={(e) => setRow({ ...row, active: e.target.value === "true" })}
            className="border p-2 w-full"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </form>
      )}
    />
  );
}
