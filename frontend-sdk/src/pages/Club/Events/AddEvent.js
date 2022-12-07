import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import { fetchAddEvent, fetchGetApprovedProposal, fetchGetProposalbyId } from "../../../API/calls";
import Dropdown from "../../../components/Dropdown";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState(null);
  const [file, setFile] = useState(null);
  const [ID, setID] = useState("");

  const user = localStorage.getItem("userId");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchGetApprovedProposal(user)
      .then((res) => {
        res.data.forEach((proposal) => {
          console.log(proposal.eventName);
          setProposals(proposals => [proposal.eventName, ...proposals]);
        });
      })
  }, [])

  useEffect(() => {
    fetchGetApprovedProposal(user)
      .then((res) => {
        res.data.forEach((proposal) => {
          if (proposal.eventName === eventName) {
            setDesc(proposal.description);
          }
        });
      })
  }, [eventName])

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Content for website</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-y-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[eventName, setEventName]}
            title="Event Name"
            placeholder="Select an approved event"
            options={proposals}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Event Description"
            placeholder="The content entered here will be shown as a description in events page"
            valueState={[desc, setDesc]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <FileUpload
            title="Thumbnail Image"
            fileState={[thumb, setThumb]} />
          <FileUpload
            title="Images"
            fileState={[file, setFile]} />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Submit" />
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
