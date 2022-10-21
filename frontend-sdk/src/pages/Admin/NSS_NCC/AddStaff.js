import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";

const AddStaff = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [priority, setpriority] = useState("");
  const [department, setdepartment] = useState("");

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Add NSS / NCC Staff</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[role, setRole]}
            title="NSS / NCC"
            placeholder="Select NSS / NCC"
            options={[
              "NSS", "NCC"
            ]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[priority, setpriority]}
            title="Priority"
            placeholder="Enter Priority"
          />
          <Inputfield
            valueState={[department, setdepartment]}
            title="Department"
            placeholder="Enter Department"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Add Staff" />
        </div>
      </div>
    </section>
  );
};

export default AddStaff;
