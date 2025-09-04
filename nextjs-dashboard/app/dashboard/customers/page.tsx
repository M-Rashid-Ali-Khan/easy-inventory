// pages/retailers.tsx
"use client";
import React from "react";
import TablePage from "@/app/ui/TablePage";
import { Column, TextCell, NonEditableCell } from "@/app/ui/tables";

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

const columns: Column<Retailer>[] = [
  { key: "name", header: "Store Name", render: TextCell },
  { key: "ownerName", header: "Owner Name", render: TextCell },
  { key: "phone", header: "Phone", render: TextCell },
  {
    key: "address",
    header: "City",
    render: (value, row, isEditing, onChange) =>
      isEditing ? (
        <input
          type="text"
          value={row.address.city}
          onChange={(e) =>
            onChange({ ...row.address, city: e.target.value })
          }
          className="border p-1 rounded w-full"
        />
      ) : (
        <span>{row.address.city}</span>
      ),
  },
  { key: "createdAt", header: "Created At", render: NonEditableCell },
];

const emptyRetailer: Retailer = {
  _id: "",
  name: "",
  ownerName: "",
  phone: "",
  address: { street: "", city: "", province: "" },
  createdAt: new Date().toISOString(),
};

export default function RetailersPage() {
  return (
    <TablePage<Retailer>
      title="Retailers Page"
      apiPath="/api/retailers"
      columns={columns}
      emptyRow={emptyRetailer}
      renderForm={(row, setRow) => (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={row.ownerName}
            onChange={(e) => setRow({ ...row, ownerName: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            value={row.phone}
            onChange={(e) => setRow({ ...row, phone: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Street"
            value={row.address.street}
            onChange={(e) =>
              setRow({ ...row, address: { ...row.address, street: e.target.value } })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="City"
            value={row.address.city}
            onChange={(e) =>
              setRow({ ...row, address: { ...row.address, city: e.target.value } })
            }
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Province"
            value={row.address.province}
            onChange={(e) =>
              setRow({ ...row, address: { ...row.address, province: e.target.value } })
            }
            className="border p-2 w-full"
          />
        </form>
      )}
    />
  );
}
