// pages/bookers.tsx
"use client";
import React, { useState, useEffect } from "react";
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
          onChange={(e) => onChange({ ...row.address, city: e.target.value })}
          className="border p-1 rounded w-full"
        />
      ) : (
        <span>{row.address.city}</span>
      ),
  },
  { key: "joinedAt", header: "Joined At", render: NonEditableCell },
];

function updateTable(setProp: React.Dispatch<React.SetStateAction<Booker[]>>) {
  fetch("/api/bookers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProp(data));
  }

export default function Page() {
  // Add Booker Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // Fetch and store bookers
  const [bookers, setBookers] = useState<Booker[]>([
    {
      _id: "bk99",
      name: "Rashid",
      phone: "0321-9876543",
      cnic: "12345-6789012-3",
      address: {
        street: "Main Market",
        city: "Rawalpindi",
        province: "Punjab",
      },
      joinedAt: "2025-01-01T12:00:00Z",
    },
  ]);
  useEffect(() => {
    updateTable(setBookers);
  }, []);
  // New booker form state
  const [newBooker, setNewBooker] = useState<Booker>({
    _id: "",
    name: "",
    phone: "",
    cnic: "",
    address: { street: "", city: "", province: "" },
    joinedAt: new Date().toISOString(),
  });

   // Update existing booker by id (full row)
  const handleUpdate = (id: string, row: Booker) => {
    fetch(`/api/bookers?id=${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    }).catch((err) => {
      console.error("Failed to update booker:", err);
    }).then(() => {
      updateTable(setBookers);
    });
  };

  // Delete booker by id
  const handleDelete = (id: string) => {
    fetch(`/api/bookers?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch((err) => {
      console.error("Failed to delete booker:", err);
    }).then(() => {
      updateTable(setBookers);
    });
  };


  // Handle modal input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "city" || name === "street" || name === "province") {
      setNewBooker((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setNewBooker((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="mb-2 font-semibold">Bookers Page</p>
        <Button onClick={() => setModalOpen(true)}>Add Booker</Button>
      </div>

      <Table
        data={bookers}
        columns={columns}
        onSave={(id, row) => handleUpdate(id, row)}
        onDelete={(id, row) => handleDelete(id)}
      />


      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        primaryBtnText="Add Booker"
        onPrimaryClick={() => {
          fetch("/api/bookers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooker),
          }).catch((err) => {
            console.error("Failed to add booker:", err);
          }).then(() => {
          console.log("Adding booker:", newBooker);
          setNewBooker({
            _id: "",
            name: "",
            phone: "",
            cnic: "",
            address: { street: "", city: "", province: "" },
            joinedAt: new Date().toISOString(),
          });
          updateTable(setBookers);
          });
          setModalOpen(false);
        }}
      >
        <h2 className="text-xl font-semibold mb-2">Add New Booker</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={newBooker.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={newBooker.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CNIC
            </label>
            <input
              type="text"
              name="cnic"
              value={newBooker.cnic}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={newBooker.address.street}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={newBooker.address.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <input
              type="text"
              name="province"
              value={newBooker.address.province}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
