import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import DateInput from "../../../components/DateInput";
import { departments } from "../../../components/Departments";
import MultipleFiles from "../../../components/MultipleFiles";

const ApplyProposal = () => {
  const [eventName, setEventName] = useState("");
  const [venue, setvenue] = useState("");
  const [count, setcount] = useState("");
  const [guest, setguest] = useState("");
  const [designation, setdesignation] = useState("");
  const [address, setaddress] = useState("");
  const [president, setpresident] = useState("");
  const [expectedExpense, setexpectedExpense] = useState("");
  const [allocatedExpense, setallocatedExpense] = useState("");
  const [amountSpent, setamountSpent] = useState("");
  const [facultyDept, setfacultyDept] = useState("");
  const [facultyName, setfacultyName] = useState("");
  const [comment, setComment] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currentDate = Date().slice(4, 15);

  return (
    <section className="px-8 py-8 w-full">
      <Heading event>Event Proposal Application</Heading>
      <label className=" text-blue text-base space-x-4">
        Date: {currentDate}
      </label>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-y-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[eventName, setEventName]}
            title="Event name"
            placeholder="Enter the event name"
          />
          <DateInput
            startTitle="Start Date"
            startState={[startDate, setStartDate]}
            endTitle="End Date"
            endState={[endDate, setEndDate]}
            range
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[venue, setvenue]}
            title="Venue"
            placeholder="Eg. J203"
          />
          <Inputfield
            valueState={[count, setcount]}
            title="Expected Participant Count"
            placeholder="Eg. 50"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[guest, setguest]}
            title="Chief Guest"
            placeholder="Eg. Mr. Abc"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[expectedExpense, setexpectedExpense]}
            title="Expected Expense"
            placeholder="In rupees, Eg. 400"
          />
          <Inputfield
            valueState={[allocatedExpense, setallocatedExpense]}
            title="Total amount allocated by SU"
            placeholder="In rupees, Eg. 500"
          />
          <Inputfield
            valueState={[amountSpent, setamountSpent]}
            title="Total amount spent on the day of request"
            placeholder="In rupees, Eg. 300"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[facultyName, setfacultyName]}
            title="Faculty Observer - Name"
            placeholder="Eg. Mr. Abc"
          />
          <Dropdown
            valueState={[facultyDept, setfacultyDept]}
            title="Faculty Observer - Department"
            placeholder="Select a department"
            options={departments}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Event Description (Brief)"
            placeholder="The content entered will be shown as a description for thumbnail in events page"
            valueState={[desc, setDesc]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Comments"
            placeholder="Special Requirements (if any)"
            valueState={[comment, setComment]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <p>Supporting Documents</p>
          <MultipleFiles fileState={[file, setFile]} />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button
            className="w-3/4"
            text="Apply Event Proposal"
            handleClick={() => {
              console.log(startDate);
              console.log(endDate);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ApplyProposal;
