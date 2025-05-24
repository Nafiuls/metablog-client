import React, { useMemo } from "react";
import UseAuth from "../../utils/hooks/UseAuth";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../utils/Header";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user } = UseAuth();
  const fetchUserWishlist = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/wishlist/${user?.email}`
    );
    return data;
  };

  const {
    data: wishlist,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: fetchUserWishlist,
  });

  // delete a wishlist
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete-wishlist/${id}`
      );
      return data;
    },
    onSuccess: () => toast.success("Wishlist deleted successfully!"),
    onError: (error) => {
      console.error("Error deleting wishlist:", error);
      toast.error("Failed to delete wishlist.");
    },
  });
  // delete wihslist function

  const handleDelete = React.useCallback(
    (id) => {
      mutateAsync(id);
    },
    [mutateAsync],
    refetch()
  );

  // handle navigate

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
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(row.original._id)}
                className="flex items-center gap-2 cursor-pointer text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-md transition duration-200 text-xs"
              >
                <FaRegTrashAlt />
                Delete
              </button>
              <Link to={`/blog/${row.original.id}`}>
                <button className="flex items-center gap-2 cursor-pointer text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-3 py-1 rounded-md transition duration-200 text-xs">
                  <FaMagnifyingGlass />
                  Details
                </button>
              </Link>
            </div>
          );
        }, // Example JSX cell
      },
    ],
    [handleDelete]
  );
  const data = useMemo(() => wishlist || [], [wishlist]);
  // react-table instance
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

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
                {row.getVisibleCells().map((cell) => (
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
