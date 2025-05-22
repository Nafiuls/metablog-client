import React, { useMemo } from "react";
import UseAuth from "../../utils/hooks/UseAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "../../utils/Header";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const Wishlist = () => {
  const { user } = UseAuth();
  const fetchUserWishlist = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/wishlist/${user?.email}`
    );
    return data;
  };

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: fetchUserWishlist,
  });

  // memoize columns and data
  const columns = useMemo(
    () => [
      {
        id: "index", // ✅
        header: "No.",
        cell: ({ row }) => row.index + 1,
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
      {
        id: "author",
        header: "Author",
        accessorFn: (row) => row.author?.authorName, // If nested, use accessorFn
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <button
              onClick={() => handleDelete(row.original._id)}
              className="cursor-pointer text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-md transition duration-200 text-xs"
            >
              Delete
            </button>
          );
        }, // Example JSX cell
      },
    ],
    []
  );
  const data = useMemo(() => wishlist || [], [wishlist]);
  // react-table instance
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(tableInstance.getHeaderGroups());

  const handleDelete = (id) => {
    console.log(id);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="py-10 flex flex-col items-center">
      <Header
        heading={"Your Wishlist Blogs"}
        subheading={
          "Easily view and manage your favorite reads — keep what you love, remove what you don't."
        }
      />
      {/* table container */}
      <div className="overflow-x-auto w-full max-w-4xl mx-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
