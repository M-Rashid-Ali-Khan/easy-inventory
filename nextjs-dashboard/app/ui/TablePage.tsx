// components/TablePage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table, { Column } from "@/app/ui/tables";
import { Button } from "@/app/ui/button";
import Modal from "@/app/ui/modal";

type CrudConfig<T> = {
  title: string;
  apiPath: string; // e.g. "/api/bookers" or "/api/products"
  columns: Column<T>[];
  emptyRow: T; // initial state for form
  renderForm: (
    row: T,
    setRow: React.Dispatch<React.SetStateAction<T>>
  ) => React.ReactNode;
};

export default function TablePage<T extends { _id: string }>({
  title,
  apiPath,
  columns,
  emptyRow,
  renderForm,
}: CrudConfig<T>) {
  const [data, setData] = useState<T[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formRow, setFormRow] = useState<T>(emptyRow);

  const updateTable = () => {
    fetch(apiPath)
      .then((res) => res.json())
      .then((rows) => setData(rows));
  };

  useEffect(() => {
    updateTable();
  }, []);

  const handleUpdate = (id: string, row: T) => {
    fetch(`${apiPath}?id=${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    })
      .then(() => updateTable())
      .catch((err) => console.error("Update failed:", err));
  };

  const handleDelete = (id: string) => {
    fetch(`${apiPath}?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      .then(() => updateTable())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleAdd = () => {
    fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formRow),
    })
      .then(() => {
        setFormRow(emptyRow);
        updateTable();
        setModalOpen(false);
      })
      .catch((err) => console.error("Add failed:", err));
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="mb-2 font-semibold">{title}</p>
        <Button onClick={() => setModalOpen(true)}>Add</Button>
      </div>

      <Table data={data} columns={columns} onSave={handleUpdate} onDelete={handleDelete} />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        primaryBtnText="Add"
        onPrimaryClick={handleAdd}
      >
        {renderForm(formRow, setFormRow)}
      </Modal>
    </>
  );
}
