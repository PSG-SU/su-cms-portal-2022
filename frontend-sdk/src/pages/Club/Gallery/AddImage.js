import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchAddClubGallery, fetchUploadFile, fetchUploadMultipleFiles } from "../../../API/calls";
import toast from "react-hot-toast";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import { AUTH_URL, PROPOSAL_URL } from "../../../API/config";

const AddImage = () => {
  const [files, setFiles] = useState([]);
  const [eventName, setEventName] = useState("");
  const [fileUrls, setFileUrls] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    axios.get(`${PROPOSAL_URL}/published/${user}`, {})
      .then((res) => {
        res.data.forEach((event) => {
          console.log(event.eventName);
          setAllEvents(allEvents => [event.eventName, ...allEvents]);
        });
      })
  }, [user])

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) {
      toast.promise(fetchAddClubGallery({ images: fileUrls, event: eventName }), {
        loading: `Uploading...`,
        success: (res) => {
          console.log(res);
          return "Upload completed";
        },
        error: "Error uploading",
      });
      return;
    }
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

  const handleUpload = () => {
    if(eventName.length <= 0) return toast.error("Chooose Event ");
    if (files.length <= 0) return toast.error("Files required for upload.");
    handleSingleUpload(files, 1, files.length);
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Upload Images</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <p>
            The first uploaded image will be on the top during display in the
            gallery page.<br></br>
            Only .jpg/.png files are supported.<br></br>
          </p>
        </div>
        <div className="flex items-center w-1/2 space-x-4 mt-4">
          <Dropdown
            valueState={[eventName, setEventName]}
            title="Event Name"
            placeholder="Choose an event"
            options={allEvents}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images to be uploaded"
            className="w-3/4"
            fileState={[files, setFiles]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Upload" handleClick={handleUpload} />
        </div>
      </div>
    </section>
  );
};

export default AddImage;
