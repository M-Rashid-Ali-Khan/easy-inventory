// pages/producers.tsx
"use client";
import React from "react";
import TablePage from "@/app/ui/TablePage";
import { Column, TextCell, NonEditableCell } from "@/app/ui/tables";

type Producer = {
  _id: string;
  name: string;
  address: string;
  contact: string;
  country: string;
};

const columns: Column<Producer>[] = [
  { key: "name", header: "Company Name", render: TextCell },
  { key: "address", header: "Address", render: TextCell },
  { key: "contact", header: "Contact", render: TextCell },
  { key: "country", header: "Country", render: TextCell },
];

const emptyProducer: Producer = {
  _id: "",
  name: "",
  address: "",
  contact: "",
  country: "",
};

export default function ProducersPage() {
  return (
    <TablePage<Producer>
      title="Producers Page"
      apiPath="/api/producers"
      columns={columns}
      emptyRow={emptyProducer}
      renderForm={(row, setRow) => (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            value={row.name}
            onChange={(e) => setRow({ ...row, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Address"
            value={row.address}
            onChange={(e) => setRow({ ...row, address: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Contact"
            value={row.contact}
            onChange={(e) => setRow({ ...row, contact: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            value={row.country}
            onChange={(e) => setRow({ ...row, country: e.target.value })}
            className="border p-2 w-full"
          />
        </form>
      )}
    />
  );
}
