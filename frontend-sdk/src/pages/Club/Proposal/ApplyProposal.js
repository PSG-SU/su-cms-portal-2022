import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import DateInput from "../../../components/DateInput";
import { departments } from "../../../components/Departments";
import MultipleFiles from "../../../components/MultipleFiles";
import { fetchAddProposal, fetchUpdateProposal, fetchUploadMultipleFiles } from "../../../API/calls";
import { ProposalContext } from ".";

const ApplyProposal = () => {
  const { updateState } = useContext(ProposalContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  const [ID, setID] = useState("");
  const [eventName, setEventName] = useState("");
  const [venue, setvenue] = useState("");
  const [count, setcount] = useState("");
  const [guest, setguest] = useState("");
  const [expectedExpense, setexpectedExpense] = useState("");
  const [allocatedExpense, setallocatedExpense] = useState("");
  const [amountSpent, setamountSpent] = useState("");
  const [facultyDept, setfacultyDept] = useState("");
  const [facultyName, setfacultyName] = useState("");
  const [comment, setComment] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const IST = 330 * 60000;

  useEffect(() => {
    console.log("Update State: ", updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setEventName(updateState?.eventName);
      setvenue(updateState?.venue);
      setcount(updateState?.count);
      setguest(updateState?.guest);
      setexpectedExpense(updateState?.expectedExpense);
      setallocatedExpense(updateState?.allocatedBudget);
      setamountSpent(updateState?.amountSpent);
      setfacultyDept(updateState?.facultyDept);
      setfacultyName(updateState?.facultyName);
      setComment(updateState?.comments);
      setDesc(updateState?.description);
      setStartDate(new Date(Date.parse(updateState?.startDate)) - IST);
      setEndDate(new Date(Date.parse(updateState?.endDate)) - IST);
    }
  }, [updateState]);

  const handleAddProposal = async () => {
    const postBody = {
      eventName: eventName,
      startDate: new Date(startDate + IST),
      endDate: new Date(endDate + IST),
      venue: venue,
      count: count,
      guest: guest,
      expectedExpense: expectedExpense,
      allocatedBudget: allocatedExpense,
      amountSpent: amountSpent,
      facultyName: facultyName,
      facultyDept: facultyDept,
      description: desc,
      comments: comment,
      createdAt: new Date(Date.now() + IST),
      user: user,
    };
    toast.promise(fetchAddProposal(postBody)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleUpdateProposal = async () => {
    console.log('id' + ID)
    const postBody = {
      eventName: eventName,
      startDate: new Date(startDate + IST),
      endDate: new Date(endDate + IST),
      venue: venue,
      count: count,
      guest: guest,
      expectedExpense: expectedExpense,
      allocatedBudget: allocatedExpense,
      amountSpent: amountSpent,
      facultyName: facultyName,
      facultyDept: facultyDept,
      description: desc,
      comments: comment,
      createdAt: new Date(Date.now() + IST),
      status: "pending",
      user: user,
    };
    toast.promise(fetchUpdateProposal(postBody, ID)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Updating...",
      success: "Updated Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Event Proposal Application</Heading>
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
          <MultipleFiles
            title="Supporting Documents"
            fileState={[files, setFiles]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text="Apply Event Proposal"
              handleClick={handleAddProposal}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Update Proposal"} handleClick={handleUpdateProposal} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplyProposal;
