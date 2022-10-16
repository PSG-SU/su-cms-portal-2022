import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";

const AddMember = () => {
  const [pos, setPos] = useState("");
  const [mname, setMname] = useState("");

  const [dept, setDept] = useState("");
  const [desgn, setDesgn] = useState("");
  const [pic, setPic] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");



  return (
    <section className="px-8 py-8 w-full">
      <Heading>Team conent for website</Heading>
      <div className="mt-8 w-full lg:w-3/4">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[pos, setPos]}
            title="Position"
            placeholder="Select a Privilege"
            options={["Member", "Student", "Faculty"]}
          />
          <Inputfield
            valueState={[mname, setMname]}
            title="Member Name"
            placeholder="Enter the name of the member"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
        <Dropdown
            valueState={[dept, setDept]}
            title="Department"
            placeholder="Select a Department"
            options={["CSE", "IT", "ECE"]}
          />
          <Inputfield
            valueState={[desgn, setDesgn]}
            title="Designation / Year of study"
            placeholder="Enter the name of the Club"
          />
          <FileUpload fileState={[pic, setPic]} />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[phone, setPhone]}
            title="Phone Number"
            placeholder="Enter Phone Number"
          />
          <Inputfield
            valueState={[email, setEmail]}
            title="Email"
            placeholder="Enter Email-Id"
          />
          </div>
          <div className="flex items-center w-full space-x-4 mt-4">
          <Dropdown
            valueState={[from, setFrom]}
            title="Select Year From"
            placeholder="Select a Department"
            options={["2003", "2004", "2005","2006", "2007", "2008","2009", "2010", "2011"]}
          />
          <Dropdown
            valueState={[to, setTo]}
            title="Select Year to"
            placeholder="Select a Department"
            options={["2003", "2004", "2005","2006", "2007", "2008","2009", "2010", "2011"]}          
          />
          </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Add Team" />
        </div>
      </div>
    </section>
  );
};

export default AddMember;
