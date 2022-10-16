import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import Column from "../../../components/Column";

const DeleteUsers = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [deptyos, setDeptyos] = useState("");
  const [acayear, setAcayear] = useState("");

  return (
    <div>
      <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <div class="col-span-12">
          <div class="overflow-auto lg:overflow-visible ">
            <table class="table text-gray-400 border-separate space-y-6 text-sm">
              <thead class="bg-gray-800 text-gray-500">
                <tr>
                  <th class="p-3">Brand</th>
                  <th class="p-3 text-left">Category</th>
                  <th class="p-3 text-left">Price</th>
                  <th class="p-3 text-left">Status</th>
                  <th class="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <tr class="bg-gray-800">
                    <td class="p-3">
                      <div class="flex align-items-center">
                        <img
                          class="rounded-full h-12 w-12  object-cover"
                          src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                          alt="unsplash image"
                        ></img>
                        <div class="ml-3">
                          <div class="">Appple</div>
                          <div class="text-gray-500">mail@rgmail.com</div>
                        </div>
                      </div>
                    </td>
                    <td class="p-3">Technology</td>
                    <td class="p-3 font-bold">200.00$</td>
                    <td class="p-3">
                      <span class="bg-green-400 text-gray-50 rounded-md px-2">
                        available
                      </span>
                    </td>
                    <td class="p-3 ">
                      <a
                        href="#"
                        class="text-gray-400 hover:text-gray-100 mr-2"
                      >
                        <i class="material-icons-outlined text-base">
                          visibility
                        </i>
                      </a>
                      <a
                        href="#"
                        class="text-gray-400 hover:text-gray-100  mx-2"
                      >
                        <i class="material-icons-outlined text-base">edit</i>
                      </a>
                      <a
                        href="#"
                        class="text-gray-400 hover:text-gray-100  ml-2"
                      >
                        <i class="material-icons-round text-base">
                          delete_outline
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsers;
