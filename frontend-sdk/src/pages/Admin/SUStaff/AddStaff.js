import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";

const AddStaff = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Add SU Team Staffs</Heading>
      <div className="mt-8 w-full lg:w-3/4">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[role, setRole]}
            title="Role"
            placeholder="Select a role"
            options={[
              "Chief Patron",
              "Patron",
              "Dean - Student Affairs",
              "Associate Dean - Finance",
              "Student Welfare & Councelling",
              "General Functioning",
              "Tech Music, Dramatics Club, Astronomy Club, Animal Welfare Club, WDC, Martial Arts Club",
              "CAP & Nature Club, ELS, Entrepreneurs Club, NSS, Tamil Mandram, Fine Arts Club, YRC, Rotaract Club, Radio Hub",
              "Higher Education Forum, Pathshala Club, GLF, SRC, Industry (Alumni) - Interaction Forum, Book Readers Club"
            ]}
            className="w-full"
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
