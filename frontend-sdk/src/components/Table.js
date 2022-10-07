import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";

const Table = ({ theads = [], tdata = [], tkeys = [], className = "" }) => {
  return (
    <table
      style={{ flexFlow: "column" }}
      className="min-w-max flex w-full table-auto rounded-t-2xl h-[400px] border-collapse"
    >
      <thead className="w-full min-w-max inline-block" style={{ flex: "0 0 auto" }}>
        <tr className="bg-gray text-cloud uppercase text-sm leading-normal rounded-t-2xl w-full table-auto">
          {theads.map((thead, idx) => (
            <th
              className={`w-1/4 py-3 px-6 text-left ${
                idx === 0 && "rounded-tl-2xl"
              }`}
            >
              {thead}
            </th>
          ))}
          <th className="w-1/4 py-3 px-6 text-center rounded-tr-2xl">
            Actions
          </th>
        </tr>
      </thead>
      <tbody
        style={{ flex: "1 1 auto" }}
        className="text-gray-600 text-sm font-light inline-block overflow-y-auto"
      >
        {tdata.map((data, idx) => (
          <tr className=" hover:bg-cloud h-12 ">
            {tkeys.map((tkey, idx) => (
              <td className={`py-3 px-6 text-center w-1/4`}>{data[tkey]}</td>
            ))}
            <td className="py-3 px-6 text-center w-1/4">
              <div className="flex item-center justify-center space-x-2">
                <AiOutlineEye size={18} />
                <BsPencil size={18} />
                <HiOutlineTrash size={18} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
