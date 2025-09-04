// app/ui/tables.tsx
import React, { useState } from "react";

export type Renderer<T> = (
  value: any,
  row: T,
  isEditing: boolean,
  onChange: (newValue: any) => void
) => React.ReactNode;

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: Renderer<T>;
};

export type TableProps<T extends { _id: string }> = {
  data: T[];
  columns: Column<T>[];
  onSave: (id: string, row: T) => void;
  onDelete?: (id: string, row: T) => void;
  page?: number;
  pageSize?: number;
};

export function TextCell<T>(
  value: any,
  _: T,
  isEditing: boolean,
  onChange: (v: any) => void
) {
  return isEditing ? (
    <input
      type="text"
      className="border rounded px-2 py-1 w-full"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{String(value ?? "")}</span>
  );
}

export function NumberCell<T>(
  value: any,
  _: T,
  isEditing: boolean,
  onChange: (v: any) => void
) {
  return isEditing ? (
    <input
      type="number"
      className="border rounded px-2 py-1 w-full"
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  ) : (
    <span>{String(value ?? "")}</span>
  );
}

export function SelectCell<T>(
  value: any,
  _: T,
  isEditing: boolean,
  onChange: (v: any) => void,
  options: string[]
) {
  return isEditing ? (
    <select
      className="border rounded px-2 py-1 w-full"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ) : (
    <span>{String(value ?? "")}</span>
  );
}

export function NonEditableCell<T>(value: any) {
  return <span>{String(value ?? "")}</span>;
}

export default function Table<T extends { _id: string }>({
  data,
  columns,
  onSave,
  onDelete,
  page = 1,
  pageSize = 20,
}: TableProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rowDrafts, setRowDrafts] = useState<Record<string, Partial<T>>>({});

  const startEdit = (row: T) => {
    const id = row._id;
    // deep-ish clone to avoid accidental shared references (addresses etc.)
    const clone = JSON.parse(JSON.stringify(row)) as Partial<T>;
    setRowDrafts((prev) => ({ ...prev, [id]: clone }));
    setEditingId(id);
  };

  const handleCellChange = (rowId: string, key: keyof T, newValue: any) => {
    setRowDrafts((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        // TS index signature workaround
        [key as string]: newValue,
      } as Partial<T>,
    }));
  };

  const handleSave = (rowId: string, originalRow: T) => {
    const draft = rowDrafts[rowId] || {};
    // Merge draft into original row (draft keys override)
    const updated = {
      ...originalRow,
      ...draft,
    } as T;

    onSave(rowId, updated);
    // cleanup
    setEditingId(null);
    setRowDrafts((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
  };

  const handleCancel = (rowId: string) => {
    setEditingId(null);
    setRowDrafts((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
          
            const rowId = row._id;
            const isEditing = editingId === rowId;
            const draft = rowDrafts[rowId] || {};
            const currentRow = (isEditing ? ({ ...row, ...draft } as T) : row) as T;

            return (
              <tr
                key={rowId}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2 text-sm">
                    {col.render
                      ? col.render(
                          // value
                          (currentRow as any)[col.key],
                          // full row
                          currentRow,
                          // isEditing
                          isEditing,
                          // onChange for the cell — update only this row's draft
                          (newValue: any) => handleCellChange(rowId, col.key, newValue)
                        )
                      : String((currentRow as any)[col.key])}
                  </td>
                ))}
                <td className="px-4 py-2 flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        className="text-green-600 hover:underline"
                        onClick={() => handleSave(rowId, row)}
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-500 hover:underline"
                        onClick={() => handleCancel(rowId)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => startEdit(row)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(row._id, row)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination UI (unchanged) */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => console.log("Prev page")}
          disabled={page <= 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(data.length / pageSize)}
        </span>
        <button
          onClick={() => console.log("Next page")}
          disabled={data.length < pageSize}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
