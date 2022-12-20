import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import { fetchGetApprovedProposal, fetchUpdateProposal } from "../../../API/calls";
import Dropdown from "../../../components/Dropdown";
import toast from "react-hot-toast";

const AddEvent = () => {
  const [thumb, setThumb] = useState(null);
  const [file, setFile] = useState(null);

  const [user, setUser] = useState("");
  const [proposals, setProposals] = useState([]);
  const [ID, setID] = useState("");
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    if (user) {
      fetchGetApprovedProposal(user)
        .then((res) => {
          res.data.forEach((proposal) => {
            console.log(proposal.eventName);
            setProposals(proposals => [proposal.eventName, ...proposals]);
          });
        })
    }
  }, [user])

  useEffect(() => {
    if (eventName) {
      fetchGetApprovedProposal(user)
        .then((res) => {
          res.data.forEach((proposal) => {
            if (proposal.eventName === eventName) {
              setDesc(proposal.description);
              setID(proposal._id);
            }
          });
        })
    }
  }, [eventName])

  const handleAddEvent = () => {
    const postBody = {
      description: desc,
      status: "published",
    }
    toast.promise(fetchUpdateProposal(postBody, ID)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Updating...",
      success: "Updated Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  }

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
          <Button className="w-3/4" text="Submit" handleClick={handleAddEvent} />
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
