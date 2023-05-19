import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import {
  fetchGetApprovedorPublishedProposal,
  fetchUpdateProposal,
  fetchUploadFile,
} from "../../../API/calls";
import Dropdown from "../../../components/Dropdown";
import Inputfield from "../../../components/TextInput";
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
  const [reglink, setReglink] = useState("");

  useEffect(() => {
    console.log("Update State: ", updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setEventName(updateState?.eventName);
      setFileUrls(updateState?.images ? updateState?.images : []);
      setDesc(updateState?.description);
      setReglink(updateState?.registrationLink);
    }
  }, [updateState]);

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      });
  }, []);

  useEffect(() => {
    if (user) {
      fetchGetApprovedorPublishedProposal(user).then(
        axios.spread((appr, publ) => {
          console.log(appr.data, publ.data);
          appr.data.forEach((proposal) => {
            console.log(proposal.eventName);
            setProposals((proposals) => [proposal.eventName, ...proposals]);
          });
          publ.data.forEach((proposal) => {
            console.log(proposal.eventName);
            setProposals((proposals) => [proposal.eventName, ...proposals]);
          });
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (eventName) {
      fetchGetApprovedorPublishedProposal(user).then(
        axios.spread((appr, publ) => {
          appr.data.forEach((proposal) => {
            if (proposal.eventName === eventName) {
              setDesc(proposal.description);
              setID(proposal._id);
              setFileUrls(proposal.images ? proposal.images : []);
              setReglink(proposal.registrationLink);
            }
          });
          publ.data.forEach((proposal) => {
            if (proposal.eventName === eventName) {
              setDesc(proposal.description);
              setID(proposal._id);
              setFileUrls(proposal.images ? proposal.images : []);
              setReglink(proposal.registrationLink);
            }
          });
        })
      );
    }
  }, [eventName]);

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) {
      console.log(fileUrls);
      const postBody = {
        description: desc,
        images: fileUrls,
        status: "published",
        registrationLink: reglink,
      };
      toast.promise(
        fetchUpdateProposal(postBody, ID).then((res) => {
          // window.location.reload();
        }),
        {
          loading: "Updating...",
          success: "Updated Successfully",
          error: (err) => {
            console.log(err);
            return `Error: ${err}`;
          },
        }
      );
    }

    const currentFile = files.pop();
    console.log(currentFile);
    toast.promise(fetchUploadFile(currentFile), {
      loading: `Uploading... ${curr_no}/${total}`,
      success: (res) => {
        let tempFileUrls = fileUrls;
        tempFileUrls.push(res.data.url);
        setFileUrls(tempFileUrls);
        handleSingleUpload(files, curr_no + 1, total);
        return `Uploaded ${curr_no}/${total}`;
      },
      error: (err) => {
        console.log(err);
        return `Error: ${err}`;
      },
    });
  };

  const handleUpload = async () => {
    if (!eventName) return toast.error("Event name required.");
    await handleSingleUpload(files, 1, files.length);
  };

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
            urlState={[fileUrls, setFileUrls]}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4 ">
          <Inputfield
            valueState={[reglink, setReglink]}
            title="Registration link"
            placeholder="Enter reg link"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {(Object.keys(updateState).length > 0 || eventName) && (
            <Button
              className="w-3/4"
              text="Cancel"
              handleClick={handleCancel}
            />
          )}
          <Button className="w-3/4" text="Publish" handleClick={handleUpload} />
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
