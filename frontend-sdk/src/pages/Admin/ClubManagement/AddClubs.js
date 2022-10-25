import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchAddClubs, fetchUpdateClubs, fetchUploadFile } from "../../../API/calls";
import { ClubManagementTabContext } from ".";

const AddClubs = () => {
  const { updateState } = useContext(ClubManagementTabContext);

  const [cat, setCat] = useState("");
  const [clid, setClid] = useState("");
  const [clname, setClname] = useState("");
  const [file, setFile] = useState("");
  const [image_url, setImage_url] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    if (Object.keys(updateState).length > 0) {
      setCat(updateState?.category);
      setClid(updateState?.club_id);
      setClname(updateState?.club_name);
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
          clubName: clname,
          clubId: clid,
          category: cat,
          image_url: res.data.url,
        };
        toast.promise(fetchAddClubs(postBody), {
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
            clubName: clname,
            clubId: clid,
            category: cat,
            image_url: res.data.url,
          };
          toast.promise(fetchUpdateClubs(postBody, ID)
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
        clubName: clname,
        clubId: clid,
        category: cat,
      };
      toast.promise(fetchUpdateClubs(postBody, ID)
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
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} Club / Association
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-1/2 space-x-4">
          <Dropdown
            valueState={[cat, setCat]}
            title="Category"
            placeholder="Select a category"
            options={["Clubs", "Associations"]}
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[clid, setClid]}
            title="Club ID"
            placeholder="Enter Club ID"
          />
          <Inputfield
            valueState={[clname, setClname]}
            title="Club Name"
            placeholder="Enter the name of the Club"
          />
        </div>

        <div className="flex items-center w-1/2 space-x-4 mt-4">
          <FileUpload
            fileState={[file, setFile]}
            title="Upload Logo"
            url={image_url}
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text="Add Club"
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

export default AddClubs;
