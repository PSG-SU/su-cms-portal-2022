import React, { useState } from "react";
import Button from "../../../components/Button";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchUploadMultipleFiles } from "../../../API/calls";
import toast from "react-hot-toast";

const AddImage = () => {
  const [files, setFiles] = useState([]);
  const [eventName, setEventName] = useState("");

  const handleUpload = async () => {
    toast.promise(fetchUploadMultipleFiles(files), {
      loading: "Uploading...",
      success: (res) => {
        console.log(res)
        return "Uploaded";
      },
      error: "Error Occured",
    });
  };


  return (
    <section className="px-8 py-8 w-full">
      <Heading>Upload Images</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <p>The last uploaded image will be on the top during display in the gallery page.<br></br>
            Only .jpg/.png files are supported.<br></br>
          </p>
        </div>
        <div className="flex items-center w-1/2 space-x-4 mt-4">
          <Inputfield
            valueState={[eventName, setEventName]}
            title="Event Name"
            placeholder="Enter Event Name"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images to be uploaded"
            className="w-3/4"
            fileState={[files, setFiles]} />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button
            className="w-3/4"
            text="Upload"
            handleClick={handleUpload}
          />
        </div>
      </div>
    </section>
  );
};

export default AddImage;
