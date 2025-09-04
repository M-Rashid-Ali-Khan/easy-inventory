// pages/bookers.tsx
"use client";
import React from "react";
import TablePage from "@/app/ui/TablePage";
import { Column, TextCell, NonEditableCell } from "@/app/ui/tables";

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

const columns: Column<Booker>[] = [
  { key: "name", header: "Name", render: TextCell },
  { key: "phone", header: "Phone", render: TextCell },
  { key: "cnic", header: "CNIC", render: TextCell },
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
  { key: "joinedAt", header: "Joined At", render: NonEditableCell },
];

const emptyBooker: Booker = {
  _id: "",
  name: "",
  phone: "",
  cnic: "",
  address: { street: "", city: "", province: "" },
  joinedAt: new Date().toISOString(),
};

export default function BookersPage() {
  return (
    <TablePage<Booker>
      title="Bookers Page"
      apiPath="/api/bookers"
      columns={columns}
      emptyRow={emptyBooker}
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
            placeholder="Phone"
            value={row.phone}
            onChange={(e) => setRow({ ...row, phone: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="CNIC"
            value={row.cnic}
            onChange={(e) => setRow({ ...row, cnic: e.target.value })}
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
