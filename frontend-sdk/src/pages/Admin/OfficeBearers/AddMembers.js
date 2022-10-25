import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchAddOfficeBearers, fetchUploadFile, fetchUpdateOfficeBearers } from "../../../API/calls";
import { OfficeBearersTabContext } from ".";

const AddMembers = () => {
  const { updateState } = useContext(OfficeBearersTabContext);

  const [ID, setID] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [deptyos, setDeptyos] = useState("");
  const [acayear, setAcayear] = useState("");
  const [file, setFile] = useState(null);
  const [image_url, setImage_url] = useState("");

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setPosition(updateState?.role);
      setName(updateState?.name);
      setDeptyos(updateState?.deptyos);
      setAcayear(updateState?.year);
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
          role: position,
          name: name,
          deptyos: deptyos,
          year: acayear,
          image_url: res.data.url,
        };
        toast.promise(fetchAddOfficeBearers(postBody), {
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
            role: position,
            name: name,
            deptyos: deptyos,
            year: acayear,
            image_url: res.data.url,
          };
          toast.promise(fetchUpdateOfficeBearers(postBody, ID)
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
        role: position,
        name: name,
        deptyos: deptyos,
        year: acayear,
      };
      toast.promise(fetchUpdateOfficeBearers(postBody, ID)
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
            valueState={[position, setPosition]}
            title="Position"
            placeholder="Select a position"
            options={[
              "Chairperson",
              "Co-Chairperson",
              "Secretary(Male)",
              "Secretary(Female)",
              "Secretary(Science)",
            ]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Dropdown
            valueState={[acayear, setAcayear]}
            title="Year"
            placeholder="Select an academic year"
            options={(() => {
              let options = [];
              let date = Date.now();
              const year = new Date(date).getFullYear();
              for (let i = 0; i < 10; i++) {
                options.push(`${year - i}-${year - i + 1}`);
              }
              return options;
            })()}
            className="w-full"
          />
          <Inputfield
            valueState={[deptyos, setDeptyos]}
            title="Dept. & Year of Study"
            placeholder="Enter details"
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
              text={"Add Member"}
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Update Member"} handleClick={handleUpdate} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddMembers;
