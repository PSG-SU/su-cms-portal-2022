import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import { fetchGetApprovedorPublishedProposal, fetchUpdateProposal, fetchUploadFile } from "../../../API/calls";
import Dropdown from "../../../components/Dropdown";
import toast from "react-hot-toast";
import { EventContext } from ".";

const AddEvent = () => {
  const { updateState } = React.useContext(EventContext);
  const [user, setUser] = useState("");
  const [proposals, setProposals] = useState([]);
  const [ID, setID] = useState("");
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  useEffect(() => {
    console.log("Update State: ", updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setEventName(updateState?.eventName);
      setDesc(updateState?.description);
    }
  }, [updateState])


  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    if (user) {
      fetchGetApprovedorPublishedProposal(user)
        .then(axios.spread((appr, publ) => {
          console.log(appr.data, publ.data);
          appr.data.forEach((proposal) => {
            console.log(proposal.eventName);
            setProposals(proposals => [proposal.eventName, ...proposals]);
          });
          publ.data.forEach((proposal) => {
            console.log(proposal.eventName);
            setProposals(proposals => [proposal.eventName, ...proposals]);
          });
        }))
    }
  }, [user])

  useEffect(() => {
    if (eventName) {
      fetchGetApprovedorPublishedProposal(user)
        .then(axios.spread((appr, publ) => {
          appr.data.forEach((proposal) => {
            if (proposal.eventName === eventName) {
              setDesc(proposal.description);
              setID(proposal._id);
            }
          });
          publ.data.forEach((proposal) => {
            if (proposal.eventName === eventName) {
              setDesc(proposal.description);
              setID(proposal._id);
            }
          });
        }))
    }
  }, [eventName])

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) return;

    const currentFile = files.pop();
    toast.promise(fetchUploadFile(currentFile), {
      loading: `Uploading... ${curr_no}/${total}`,
      success: (res) => {
        let tempFileUrls = fileUrls;
        tempFileUrls.push(res.data.url);
        setFileUrls(tempFileUrls);
        handleSingleUpload(files, curr_no + 1, total);
        return `Uploaded ${curr_no}/${total}`;
      },
      error: "Error Occured",
    });
  };

  const handleUpload = async () => {
    if (eventName.length <= 0) return toast.error("Event name required.");
    if (files.length <= 0) return toast.error("Files required for upload.");
    await handleSingleUpload(files, 1, files.length);
  };

  const handlePublishEvent = () => {
    toast.promise(handleUpload(), {
      loading: "Uploading...",
      success: (res) => {
        const postBody = {
          description: desc,
          images: fileUrls,
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
        return "Upload completed";
      },
      error: "Error Occured",
    });
  }

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

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
          <MultipleFiles
            title="Images"
            fileState={[files, setFiles]}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Publish" handleClick={handlePublishEvent} />
          {(Object.keys(updateState).length > 0 || eventName) && <Button className="w-3/4" text="Cancel" handleClick={handleCancel} />}
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
