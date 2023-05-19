import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
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
  const { updateState } = useContext(EventContext);
  const [user, setUser] = useState("");
  const [proposals, setProposals] = useState([]);
  const [ID, setID] = useState("");
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [reglink, setReglink] = useState("");

  useEffect(() => {
    console.log("Update State: ", updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setEventName(updateState?.eventName);
      setImageUrls(updateState?.images ? updateState?.images : []);
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
      fetchGetApprovedorPublishedProposal(user)
        .then((res) => {
          res.data.forEach((proposal) => {
            setProposals((prev) => [...prev, proposal.eventName]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (eventName) {
      fetchGetApprovedorPublishedProposal(user)
        .then((res) => {
          const eventData = res.data.filter((p) => p.eventName === eventName)[0]
          setID(eventData?._id);
          setEventName(eventData?.eventName);
          setImageUrls(eventData?.images ? eventData.images : []);
          setDesc(eventData?.description);
          setReglink(eventData?.registrationLink);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [eventName, user]);

  const handleMultipleUpload = async (files, curr_no, total) => {
    if (files.length <= 0) {
      setImageUrls(imageUrls);

      const postBody = {
        description: desc,
        images: imageUrls,
        status: "published",
        registrationLink: reglink,
        publishedAt: new Date(),
      };
      toast.promise(
        fetchUpdateProposal(postBody, ID).then((res) => {
          window.location.reload();
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
      return;
    }

    const currentFile = files.pop();
    toast.promise(fetchUploadFile(currentFile), {
      loading: `Uploading ${currentFile.name} (${curr_no}/${total})`,
      success: (res) => {
        let tempFileUrls = imageUrls;
        tempFileUrls.push(res.data.url);
        setImageUrls(tempFileUrls);
        handleMultipleUpload(files, curr_no + 1, total);
        return `Uploaded ${curr_no}/${total}`;
      },
      error: (err) => {
        console.log(err);
        return `Error: ${err}`;
      },
    });
  };

  const handlePublish = async () => {
    if (!eventName) return toast.error("Event name required.");

    if (images.length > 0) {
      await handleMultipleUpload(images, 1, images.length);
    } else {
      const postBody = {
        description: desc,
        images: imageUrls,
        status: "published",
        registrationLink: reglink,
        publishedAt: new Date(),
      };
      toast.promise(
        fetchUpdateProposal(postBody, ID).then((res) => {
          window.location.reload();
        }),
        {
          loading: "Publishing...",
          success: "Published Successfully",
          error: (err) => {
            console.log(err);
            return `Error: ${err.response.data.error}`;
          },
        }
      );
    }
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Content for website</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-y-auto">
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
            placeholder="The content entered here will be shown as description in the feed."
            valueState={[desc, setDesc]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images (Optional)"
            subtitle="Upload event posters, images, etc."
            fileState={[images, setImages]}
            urlState={[imageUrls, setImageUrls]}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4 ">
          <Inputfield
            valueState={[reglink, setReglink]}
            title="Registration link (Optional)"
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
          <Button className="w-3/4" text="Publish" handleClick={handlePublish} />
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
