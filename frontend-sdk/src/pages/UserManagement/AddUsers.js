import React, { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Heading from "../../components/Heading";
import Inputfield from "../../components/TextInput";

const AddUsers = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [cname, setcname] = useState("");
  const [rights, setrights] = useState("");

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Add Users</Heading>
      <div className="mt-8  w-3/4">
      <div className="flex items-center w-full space-x-4 mt-4">
          <Dropdown
            valueState={[rights, rights]}
            title="Rights"
            placeholder="Select a Privilege"
            options={[
              "Student",
              "Faculty Advisor",
              "Dean",
            ]}
            className="w-full"
          />
          <Dropdown
            valueState={[cname, cname]}
            title="Club Name"
            placeholder="Select a Privilege"
            options={[
              "Student",
              "Faculty Advisor",
              "Dean",
            ]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[position, setPosition]}
            title="Position"
            placeholder="Select a position"
            options={[
              "Chairperson",
              "Co-Chairperson",
              "Secretary(Male)",
              "Secretary(Female)",
              "Secretary(Science)",
            ]}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Add Member" />
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
