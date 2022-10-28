import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAddSUTeamStaff, fetchUpdateSUTeamStaff, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { SUStaffTabContext } from ".";

const AddStaff = () => {
  const { updateState } = useContext(SUStaffTabContext);

  const [ID, setID] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [image_url, setImage_url] = useState("");

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setRole(updateState?.role);
      setName(updateState?.name);
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
          role: role,
          name: name,
          image_url: res.data.url,
        };
        toast.promise(fetchAddSUTeamStaff(postBody), {
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
            role: role,
            name: name,
            image_url: res.data.url,
          };
          toast.promise(fetchUpdateSUTeamStaff(postBody, ID)
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
        role: role,
        name: name,
      };
      toast.promise(fetchUpdateSUTeamStaff(postBody, ID)
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
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} SU Team Staff
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[role, setRole]}
            title="Role"
            placeholder="Select a role"
            options={[
              "Chief Patron",
              "Patron",
              "Dean - Student Affairs",
              "Associate Dean - Finance",
              "Student Welfare & Councelling",
              "General Functioning",
              "Tech Music, Dramatics Club, Astronomy Club, Animal Welfare Club, WDC, Martial Arts Club",
              "CAP & Nature Club, ELS, Entrepreneurs Club, NSS, Tamil Mandram, Fine Arts Club, YRC, Rotaract Club, Radio Hub",
              "Higher Education Forum, Pathshala Club, GLF, SRC, Industry (Alumni) - Interaction Forum, Book Readers Club"
            ]}
            className="w-full"
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
              text={"Add Staff"}
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Update Staff"} handleClick={handleUpdate} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddStaff;
