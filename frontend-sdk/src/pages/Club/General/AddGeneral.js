import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchAddGeneral, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";

const AddGeneral = () => {
  const [file, setFile] = useState(null);
  const [value, setvalue] = useState("");

  const handlePost = async () => {
    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        const postBody = {
          image_url: res.data.url,
          content: value
        };
        toast.promise(fetchAddGeneral(postBody), {
          loading: "Adding...",
          success: "Added Successfully",
          error: (err) => `Error: ${err.response.data.error}`,
        });
        return "Uploaded";
      },
      error: "Error Occured",
    });
  };


  return (
    <section className="px-8 py-8 w-full">
      <Heading>Upload Logo</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <FileUpload
            title="Image to be uploaded"
            fileState={[file, setFile]} />
        </div>
        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Description</Heading>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="About the club / association"
            placeholder="Enter about home page"
            valueState={[value, setvalue]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Upload" handleClick={handlePost} />
        </div>
      </div>
    </section>
  );
};

export default AddGeneral;
