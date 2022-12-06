import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { departments } from "../../../components/Departments";
import DateInput from "../../../components/DateInput";

const AddMember = () => {
  const [pos, setPos] = useState("");
  const [mname, setMname] = useState("");

  const [dept, setDept] = useState("");
  const [desgn, setDesgn] = useState("");
  const [pic, setPic] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Content for website</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[pos, setPos]}
            title="Position"
            placeholder="Select a Position"
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
            options={departments}
          />
          <Inputfield
            valueState={[desgn, setDesgn]}
            title="Designation / Year of study"
            placeholder="Enter the name of the Club"
          />
          <FileUpload
            title="Member photo"
            fileState={[pic, setPic]} />
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
          <DateInput
            startTitle="From"
            endTitle="To"
            startState={[startDate, setStartDate]}
            endState={[endDate, setEndDate]}
            dateformat="yyyy"
            range
            year
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button
            className="w-3/4"
            text="Add Team"
            handleClick={
              () => {
                console.log(startDate.getFullYear(), endDate.getFullYear());
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default AddMember;
