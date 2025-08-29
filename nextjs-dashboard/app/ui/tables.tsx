// components/Table.tsx
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

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onUpdate: (rowIndex: number, key: keyof T, value: any) => void;
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
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
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  ) : (
    <span>{value}</span>
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ) : (
    <span>{value}</span>
  );
}

export function ActionCell<T>(
  _: any,
  row: T,
  __: boolean,
  ___: (v: any) => void,
  onAction: (row: T) => void
) {
  return (
    <button
      className="text-blue-500 hover:underline"
      onClick={() => onAction(row)}
    >
      Action
    </button>
  );
}

// Non-editable cell renderer
export function NonEditableCell<T>(value: any) {
  return <span>{value}</span>;
}

export default function Table<T>({
  data,
  columns,
  onUpdate,
  page = 1,
  pageSize = 20,
}: TableProps<T>) {
  const [editingRow, setEditingRow] = useState<number | null>(null);

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
          {data.map((row, rowIndex) => {
            const isEditing = editingRow === rowIndex;
            return (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2 text-sm">
                    {col.render
                      ? col.render(
                          row[col.key],
                          row,
                          isEditing,
                          (newValue) => onUpdate(rowIndex, col.key, newValue)
                        )
                      : String(row[col.key])}
                  </td>
                ))}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <button
                      className="text-green-500"
                      onClick={() => setEditingRow(null)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500"
                      onClick={() => setEditingRow(rowIndex)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Optional pagination */}
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
