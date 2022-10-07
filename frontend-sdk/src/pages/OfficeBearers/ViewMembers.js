/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import {HiOutlineTrash} from "react-icons/hi"
import Heading from "../../components/Heading";

const ViewMembers = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [deptyos, setDeptyos] = useState("");
  const [acayear, setAcayear] = useState("");

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Members</Heading>
      <div className="mt-8  w-3/4">
        <table class="min-w-max w-full table-auto rounded-t-2xl h-[calc(100vh-300px)]">
          <thead>
            <tr class="bg-gray text-cloud uppercase text-sm leading-normal rounded-t-2xl">
              <th class="py-3 px-6 text-left rounded-tl-2xl">Name</th>
              <th class="py-3 px-6 text-left">Position</th>
              <th class="py-3 px-6 text-center">Year</th>
              <th class="py-3 px-6 text-center">Dept. & YOS</th>
              <th class="py-3 px-6 text-center rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light h-fit ">
            <tr class=" hover:bg-cloud h-12">
              <td class="py-3 px-6 text-left whitespace-nowrap"></td>
              <td class="py-3 px-6 text-left"></td>
              <td class="py-3 px-6 text-center"></td>
              <td class="py-3 px-6 text-center"></td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center space-x-2">
                  <AiOutlineEye size={18} />
                  <BsPencil size={18} />
                  <HiOutlineTrash size={18} />
                </div>
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewMembers;
