
"use client";

import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { StockData } from "../types";
import { useState } from "react";

const columnHelper = createColumnHelper<StockData>();

const PortfolioTable = ({ data }: { data: StockData[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("stockName", {
        header: "Particulars",
        cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
      }),
      columnHelper.accessor("purchasePrice", {
        header: "Pur. Price",
        cell: (info) => info.getValue().toFixed(2),
      }),
      columnHelper.accessor("quantity", {
        header: "Qty",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("investment", {
        header: "Inv. Amt",
        cell: (info) => info.getValue().toFixed(2),
      }),
      columnHelper.accessor("portfolioPercentage", {
        header: "Port %",
        cell: (info) => `${info.getValue().toFixed(2)}%`,
      }),
      columnHelper.accessor("symbol", {
        header: "Symbol",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("cmp", {
        header: "CMP",
        cell: (info) => (info.getValue() || 0).toFixed(2),
      }),
      columnHelper.accessor("presentValue", {
        header: "Pres. Val",
        cell: (info) => (info.getValue() || 0).toFixed(2),
      }),
      columnHelper.accessor("gainLoss", {
        header: "Gain/Loss",
        cell: (info) => {
          const val = info.getValue() || 0;
          return (
            <span
              className={val >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}
            >
              {val.toFixed(2)}
            </span>
          );
        },
      }),
      columnHelper.accessor("peRatio", {
        header: "P/E",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("earnings", {
        header: "Earnings",
        cell: (info) => info.getValue() || "-",
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
