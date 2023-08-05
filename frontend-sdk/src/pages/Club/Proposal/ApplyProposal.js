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
import { fetchAddProposal, fetchUpdateProposal, fetchUploadFile } from "../../../API/calls";
import { ProposalContext } from ".";
import Toggle from "../../../components/Toggle";

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
  const [venue, setVenue] = useState("");
  const [count, setCount] = useState("");
  const [guest, setGuest] = useState("");
  const [expectedExpense, setExpectedExpense] = useState("");
  const [allocatedExpense, setAllocatedExpense] = useState("");
  const [amountSpent, setAmountSpent] = useState("");
  const [inCollab, setInCollab] = useState("No");
  const [orgName, setOrgName] = useState("");
  const [budgetSplit, setBudgetSplit] = useState("");
  const [facultyDept, setFacultyDept] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [comment, setComment] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    console.log("Update State: ", updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setEventName(updateState?.eventName);
      setVenue(updateState?.venue);
      setCount(updateState?.count);
      setGuest(updateState?.guest);
      setExpectedExpense(updateState?.expectedExpense);
      setAllocatedExpense(updateState?.allocatedBudget);
      setAmountSpent(updateState?.amountSpent);
      setInCollab(updateState?.inCollab ? updateState?.inCollab : "No");
      setOrgName(updateState?.orgName);
      setBudgetSplit(updateState?.budgetSplit);
      setFacultyDept(updateState?.facultyDept);
      setFacultyName(updateState?.facultyName);
      setComment(updateState?.comments);
      setDesc(updateState?.description);
      setFileURLs(updateState?.fileURLs ? updateState?.fileURLs : []);
      setStartDate(updateState?.startDate ? new Date(updateState?.startDate) : "");
      setEndDate(updateState?.endDate ? new Date(updateState?.endDate) : "");
    }
  }, [updateState]);

  const handleMultipleUpload = async (files, curr_no, total, update) => {
    if (files.length <= 0) {
      setFileURLs(fileURLs);

      const postBody = {
        eventName: eventName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue: venue,
        count: count,
        guest: guest,
        expectedExpense: expectedExpense,
        allocatedBudget: allocatedExpense,
        amountSpent: amountSpent,
        inCollab: inCollab,
        orgName: orgName,
        budgetSplit: budgetSplit,
        facultyName: facultyName,
        facultyDept: facultyDept,
        description: desc,
        comments: comment,
        createdAt: new Date(Date.now()),
        user: user,
        fileURLs: fileURLs,
      };

      if (update === 1) {
        toast.promise(fetchUpdateProposal(postBody, ID)
          .then((res) => {
            window.location.reload();
          }), {
          loading: "Updating...",
          success: "Updated Successfully",
          error: (err) => `Error: ${err.response.data.error}`,
        });
      } else {
        toast.promise(fetchAddProposal(postBody)
          .then((res) => {
            window.location.reload();
          }), {
          loading: "Adding...",
          success: "Added Successfully",
          error: (err) => `Error: ${err.response.data.error}`,
        });
      }
      return;
    }
    const currentFile = files.pop();
    toast.promise(fetchUploadFile(currentFile), {
      loading: `Uploading ${currentFile.name} (${curr_no}/${total})`,
      success: (res) => {
        let tempFileUrls = fileURLs;
        tempFileUrls.push(res.data.url);
        setFileURLs(tempFileUrls);
        handleMultipleUpload(files, curr_no + 1, total, update);
        return `Uploaded ${curr_no}/${total}`;
      },
      error: (err) => {
        return `Error Uploading: ${err.message}`;
      },
    });
  };

  const handleAddProposal = async () => {
    if (inCollab === "yes") {
      if (orgName === "") {
        toast.error("Please enter the name of the organization");
        return;
      }
      if (budgetSplit === "") {
        toast.error("Please enter the budget split");
        return;
      }
    }

    if (files.length > 0) {
      await handleMultipleUpload(files, 1, files.length, 0);
    } else {
      const postBody = {
        eventName: eventName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue: venue,
        count: count,
        guest: guest,
        expectedExpense: expectedExpense,
        allocatedBudget: allocatedExpense,
        amountSpent: amountSpent,
        inCollab: inCollab,
        orgName: orgName,
        budgetSplit: budgetSplit,
        facultyName: facultyName,
        facultyDept: facultyDept,
        description: desc,
        comments: comment,
        createdAt: new Date(Date.now()),
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
    }
  };

  const handleUpdateProposal = async () => {
    console.log('id' + ID)

    if (inCollab === "yes") {
      if (orgName === "") {
        toast.error("Please enter the name of the organization");
        return;
      }
      if (budgetSplit === "") {
        toast.error("Please enter the budget split");
        return;
      }
    }
    if (files.length > 0) {
      await handleMultipleUpload(files, 1, files.length, 1);
    } else {
      const postBody = {
        eventName: eventName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue: venue,
        count: count,
        guest: guest,
        expectedExpense: expectedExpense,
        allocatedBudget: allocatedExpense,
        amountSpent: amountSpent,
        inCollab: inCollab,
        orgName: orgName,
        budgetSplit: budgetSplit,
        facultyName: facultyName,
        facultyDept: facultyDept,
        description: desc,
        comments: comment,
        fileURLs: fileURLs,
        createdAt: new Date(Date.now()),
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
    }
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Event Proposal Application</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-y-auto">
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
            valueState={[venue, setVenue]}
            title="Venue"
            placeholder="Eg. A123"
          />
          <Inputfield
            valueState={[count, setCount]}
            title="Expected Participant Count"
            placeholder="Eg. 50"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[guest, setGuest]}
            title="Chief Guest (with designation) (Optional)"
            placeholder="Eg. Mr. John Doe, Manager, ABC Pvt. Ltd."
          />
        </div>
        <div className="flex items-end w-full space-x-4 mt-4">
          <Inputfield
            valueState={[expectedExpense, setExpectedExpense]}
            title="Expected Expense"
            placeholder="In rupees, Eg. 400"
          />
          <Inputfield
            valueState={[allocatedExpense, setAllocatedExpense]}
            title="Total amount allocated by SU"
            placeholder="In rupees, Eg. 500"
          />
          <Inputfield
            valueState={[amountSpent, setAmountSpent]}
            title="Total amount spent on the day of request"
            placeholder="In rupees, Eg. 300"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Toggle
            title={"Is the event being conducted in collaboration with any other organization?"}
            className="mt-4 w-1/2"
            options={["Yes", "No"]}
            valueState={[inCollab, setInCollab]}
          />
        </div>
        {
          (inCollab === "Yes") && (<div className="flex items-center w-full space-x-4 mt-4">
            <Inputfield
              valueState={[orgName, setOrgName]}
              title="Name of Organisation"
              placeholder="Eg.Students Union"
            />
            <Inputfield
              valueState={[budgetSplit, setBudgetSplit]}
              title="How is the budget split ?"
              placeholder="Eg. Club - Rs.5000, Students Union - Rs.5000"
            />
          </div>
          )
        }
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[facultyName, setFacultyName]}
            title="Faculty Observer - Name"
            placeholder="Eg. Mr. Abc"
          />
          <Dropdown
            valueState={[facultyDept, setFacultyDept]}
            title="Faculty Observer - Department"
            placeholder="Select a department"
            options={departments}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Event Description"
            placeholder="Enter a brief description of the event"
            valueState={[desc, setDesc]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Comments (Optional)"
            placeholder="Special Requirements (if any)"
            valueState={[comment, setComment]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Supporting Documents"
            fileState={[files, setFiles]}
            urlState={[fileURLs, setFileURLs]}
            pdf
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
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update Proposal"} handleClick={handleUpdateProposal} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplyProposal;
