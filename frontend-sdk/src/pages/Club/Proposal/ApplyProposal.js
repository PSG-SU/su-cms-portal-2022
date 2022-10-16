import React, { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";

const ApplyProposal = () => {
  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [venue, setvenue] = useState("");
  const [fromTime, setfromTime] = useState("");
  const [toTime, settoTime] = useState("");
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

  const [file, setFile] = useState(null);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Event Proposal Application</Heading>
      <div className="mt-8 w-full lg:w-4/5">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[date, setDate]}
            title="Date"
            placeholder="Enter date"
          />
          <Inputfield
            valueState={[eventName, setEventName]}
            title="Event"
            placeholder="Enter the event name"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[fromDate, setfromDate]}
            title="From Date"
            placeholder="Enter from date"
          />
          <Inputfield
            valueState={[toDate, settoDate]}
            title="To Date"
            placeholder="Enter to date"
          />
          <Inputfield
            valueState={[venue, setvenue]}
            title="Venue"
            placeholder="Eg. J203"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[fromTime, setfromTime]}
            title="From Time"
            placeholder="Eg. 4:30 PM"
          />
          <Inputfield
            valueState={[toTime, settoTime]}
            title="To Time"
            placeholder="Eg. 6:00 PM"
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
          <Inputfield
            valueState={[designation, setdesignation]}
            title="Designation"
            placeholder="Enter the designation of chief guest"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[address, setaddress]}
            title="Address"
            placeholder="Enter the place of work"
          />
          <Inputfield
            valueState={[president, setpresident]}
            title="President"
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
          <Dropdown
            valueState={[facultyDept, setfacultyDept]}
            title="Faculty Observer - Department"
            placeholder="Select a department"
            options={[
              "Chairperson",
              "Co-Chairperson",
              "Secretary(Male)",
              "Secretary(Female)",
              "Secretary(Science)",
            ]}
            className="w-full"
          />
          <Inputfield
            valueState={[facultyName, setfacultyName]}
            title="Faculty Observer - Name"
            placeholder="Eg. Mr. Abc"
          /> 
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea 
            title="Comments"
            placeholder="Special Requirements (if any)"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Event Description (Brief)"
            placeholder="The content entered will be shown as a description for thumbnail in events page"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <p>Supporting Documents</p>
          <FileUpload fileState={[file, setFile]} />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Apply Event Proposal" />
        </div>
      </div>
    </section>
  );
};

export default ApplyProposal;
