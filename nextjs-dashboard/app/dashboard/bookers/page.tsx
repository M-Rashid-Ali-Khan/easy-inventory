// pages/bookers.tsx
"use client";
import React, { useState } from "react";
import Table, { Column, TextCell, NonEditableCell } from "@/app/ui/tables";
import { Button } from "@/app/ui/button";
import Modal from "@/app/ui/modal";


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

export default function Page() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bookers, setBookers] = useState<Booker[]>([
    {
      _id: "bk99",
      name: "Rashid",
      phone: "0321-9876543",
      cnic: "12345-6789012-3",
      address: { street: "Main Market", city: "Rawalpindi", province: "Punjab" },
      joinedAt: "2025-01-01T12:00:00Z",
    },
    // add more bookers here
  ]);

  const handleUpdate = (rowIndex: number, key: keyof Booker, value: any) => {
    const updated = [...bookers];
    if (key === "address") {
      updated[rowIndex].address = value; // replace whole address object
    } else {
      updated[rowIndex][key] = value;
    }
    setBookers(updated);

    // API PUT request to save changes
    fetch("/api/bookers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: updated[rowIndex]._id, updates: { [key]: value } }),
    });
  };

  const columns: Column<Booker>[] = [
    {
      key: "name",
      header: "Name",
      render: TextCell,
    },
    {
      key: "phone",
      header: "Phone",
      render: TextCell,
    },
    {
      key: "cnic",
      header: "CNIC",
      render: TextCell,
    },
    {
      key: "address",
      header: "City",
      render: (value, row, isEditing, onChange) =>
        isEditing ? (
          <input
            type="text"
            value={row.address.city}
            onChange={(e) => onChange({ ...row.address, city: e.target.value })}
            className="border p-1 rounded w-full"
          />
        ) : (
          <span>{row.address.city}</span>
        ),
    },
    {
      key: "joinedAt",
      header: "Joined At",
      render: NonEditableCell,
    },
    // {
    //   key: "_id",
    //   header: "Actions",
    //   render: (v, row) =>
    //     ActionCell(v, row, false, () => {}, (r) => alert(`Editing booker ${r.name}`)),
    // },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
      <p className="mb-2 font-semibold">Bookers Page</p>
      <Button onClick={() => setModalOpen(true)}>Add Booker</Button>
      </div>
      <Table data={bookers} columns={columns} onUpdate={handleUpdate} />

      <Modal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)} 
      primaryBtnText="Add Booker" 
      onPrimaryClick={() => { 
        // Add booker logic here
        setModalOpen(false);
        }}>
        <h2 className="text-xl font-semibold mb-2">Add New Booker</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CNIC</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </form>
      </Modal>
    </>
  );
}
