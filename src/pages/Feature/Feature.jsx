import React, { useMemo } from "react";
import Header from "../../utils/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const Feature = () => {
  const featureBlogs = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/featured`
    );
    return data;
  };
  const { data: topBlogs = [], isLoading } = useQuery({
    queryKey: ["topBlogs"],
    queryFn: featureBlogs,
  });
  // top sorted blogs
  const sorted = topBlogs
    .sort((a, b) => b.longDescription - a.longDescription)
    .slice(0, 10);
  const columns = useMemo(
    () => [
      {
        id: "index",
        header: "Rank",
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
        accessorFn: (row) => row.author?.authorName,
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <Link to={`/blog/${row.original._id}`}>
              <button className="flex items-center gap-2 cursor-pointer text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-3 py-1 rounded-md transition duration-200 text-xs">
                <FaMagnifyingGlass />
                Details
              </button>
            </Link>
          );
        },
      },
    ],

    []
  );

  const data = useMemo(() => sorted, [sorted]);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="py-10 px-4 flex flex-col justify-center">
      <Header
        heading={"Hot Picks & Cool Clicks"}
        subheading={
          "Our top 10 blogs strutting their stuff — because even blogs deserve the spotlight!"
        }
      />
      {/* top blogs table */}
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

export default Feature;
