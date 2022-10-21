import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchAddNssNcc, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";

const AddNssNcc = () => {
  const [scheme, setScheme] = useState("");
  const [name, setName] = useState("");
  const [priority, setpriority] = useState(0);
  const [department, setdepartment] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = async () => {
    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        const postBody = {
          name: name,
          scheme: scheme,
          priority: priority,
          dept: department,
          image_url: res.data.url,
        };
        toast.promise(fetchAddNssNcc(postBody), {
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
      <Heading>Add NSS / NCC Staff</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[scheme, setScheme]}
            title="NSS / NCC"
            placeholder="Select NSS / NCC"
            options={[
              "NSS", "NCC"
            ]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[priority, setpriority]}
            title="Priority"
            placeholder="Enter Priority"
          />
          <Inputfield
            valueState={[department, setdepartment]}
            title="Department"
            placeholder="Enter Department"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <FileUpload
            fileState={[file, setFile]}
            title="Upload Image"
            className="w-1/2"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Add Staff" handleClick={handlePost} />
        </div>
      </div>
    </section>
  );
};

export default AddNssNcc;
