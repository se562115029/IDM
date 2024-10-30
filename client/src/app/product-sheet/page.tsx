/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Product, useGetProductsQuery } from "@/app/state/api";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableCell from "./tableCell";
import "@/app/table.css";
import Header from "../_components/Header";
import { RefreshCcw } from "lucide-react";

// import Filter from "./filter";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const ProductSheet = () => {
  /** Pass at value/Pram to Redux toolkit query hook*/
  const getProduct = useGetProductsQuery();

  const [data, setData] = useState(getProduct.data || []);

  // const rerender = useReducer(() => ({}), {})[1];
  // const columnHelper = createColumnHelper<Product>();
  // const columns = [
  //   columnHelper.accessor("productId", {
  //     header: "Product ID",
  //     cell: TableCell,
  //   }),
  //   columnHelper.accessor("name", {
  //     header: "Product Name",
  //   }),
  //   columnHelper.accessor("price", {
  //     header: "Price",
  //   }),
  //   columnHelper.accessor("rating", {
  //     header: "Rating",
  //   }),
  //   columnHelper.accessor("stockQuantity", {
  //     header: "Stock Quantity",
  //   }),
  // ];

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "productId",
        footer: (props) => props.column.id,
        cell: (info) => info.getValue(),
      },
      {
        header: "Product Name",
        accessorKey: "name",
        footer: (props) => props.column.id,
        cell: (props) => TableCell(props),
      },
      {
        header: "Price",
        accessorKey: "price",
        footer: (props) => props.column.id,
        cell: (props) => TableCell(props),
      },
      {
        header: "Rating",
        accessorKey: "rating",
        footer: (props) => props.column.id,
        cell: (props) => TableCell(props),
      },
      {
        header: "Stock Quantity",
        accessorKey: "stockQuantity",
        footer: (props) => props.column.id,
        cell: (props) => TableCell(props),
      },
    ],
    []
  );

  const useSkipper = () => {
    const shouldSkipRef = useRef(true);
    const shouldSkip = shouldSkipRef.current;

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = useCallback(() => {
      shouldSkipRef.current = false;
    }, []);

    useEffect(() => {
      shouldSkipRef.current = true;
    });

    return [shouldSkip, skip] as const;
  };

  const refreshData = () => setData(getProduct.data || []);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,

    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  if (getProduct.isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (getProduct.isError || !getProduct.data) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
      <div className="flex justify-between items-center mb-6">
        <Header name="Product Sheet" />

        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => refreshData()}
        >
          <RefreshCcw className="w-5 h-5 mr-2 !text-gray-200" /> Refresh Data
        </button>
      </div>
      <div className="h-2" />
      <table className="w-full bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      {/* <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div> */}
    </div>
  );
};

export default ProductSheet;
