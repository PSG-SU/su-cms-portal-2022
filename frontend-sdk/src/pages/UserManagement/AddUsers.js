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
  const [pwd, setpwd] = useState("");
  const [rpwd, setrpwd] = useState("");


  return (
    <section className="px-8 py-8 w-full">
      <Heading>Add Users</Heading>
      <div className="mt-8  w-3/4">
      <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[rights, setrights]}
            title="Rights"
            placeholder="Select a Privilege"
            options={[
              "Student",
              "Faculty Advisor",
              "Dean",
            ]}
          />
          <Dropdown
            valueState={[cname, setcname]}
            title="Club Name"
            placeholder="Select a club"
            options={[
              "Student",
              "Faculty Advisor",
              "Dean",
            ]}
            className="w-full"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[name, setName]}
            title="User Id"
            placeholder="Enter userId"
          />
           <Inputfield
            type="Password"
            valueState={[pwd, setpwd]}
            title="Password"
            placeholder="Enter your password here"
          />
           <Inputfield
            type="Password"
            valueState={[rpwd, setrpwd]}
            title="Re-Enter Password"
            placeholder="Re-Enter your password here"
          />
        </div>
        
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Add User" />
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
