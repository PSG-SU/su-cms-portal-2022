import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAddNssNcc, fetchUpdateNssNcc, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { NssNccTabContext } from ".";

const AddNssNcc = () => {
  const { updateState } = useContext(NssNccTabContext);

  const [ID, setID] = useState("");
  const [scheme, setScheme] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState(null);
  const [image_url, setImage_url] = useState("");

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setScheme(updateState?.scheme);
      setName(updateState?.name);
      setPriority(updateState?.priority);
      setDepartment(updateState?.dept);
      setImage_url(updateState?.image_url);
      setID(updateState?._id);
    }
  }, [updateState]);

  const handlePost = async () => {
    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        setImage_url(res.data.url);
        const postBody = {
          name: name,
          scheme: scheme,
          priority: priority,
          dept: department,
          image_url: res.data.url,
        };
        toast.promise(fetchAddNssNcc(postBody)
          .then((res) => {
            window.location.reload();
          }), {
          loading: "Adding...",
          success: "Added Successfully",
          error: (err) => `Error: ${err.response.data.error}`,
        });
        return "Uploaded";
      },
      error: "Error Occured",
    });
  };

  const handleUpdate = async () => {
    if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading...",
        success: (res) => {
          setImage_url(res.data.url);
          const postBody = {
            name: name,
            scheme: scheme,
            priority: priority,
            dept: department,
            image_url: res.data.url,
          };
          toast.promise(fetchUpdateNssNcc(postBody, ID)
            .then((res) => {
              window.location.reload();
            }), {
            loading: "Adding...",
            success: "Added Successfully",
            error: (err) => `Error: ${err.response.data.error}`,
          });
          return "Uploaded";
        },
        error: "Error Occured",
      });

    } else {
      const postBody = {
        name: name,
        scheme: scheme,
        priority: priority,
        dept: department,
      };
      toast.promise(fetchUpdateNssNcc(postBody, ID)
        .then((res) => {
          window.location.reload();
        }), {
        loading: "Adding...",
        success: "Added Successfully",
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
      <Heading>
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} Members
      </Heading>
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
            valueState={[priority, setPriority]}
            title="Priority"
            placeholder="Enter Priority"
          />
          <Inputfield
            valueState={[department, setDepartment]}
            title="Department"
            placeholder="Enter Department"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <FileUpload
            fileState={[file, setFile]}
            title="Upload Image"
            className="w-1/2"
            url={image_url}
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text="Add Staff"
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Update Club"} handleClick={handleUpdate} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddNssNcc;
