import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";
import { fetchAddGallery, fetchUpdateGallery, fetchUploadFile } from "../../../API/calls";
import toast from "react-hot-toast";
import { GalleryTabContext } from ".";

const AddImage = () => {
  const { updateState } = useContext(GalleryTabContext);

  const [files, setFiles] = useState([]);
  const [eventName, setEventName] = useState("");
  const [year, setYear] = useState("");
  const [fileUrls, setFileUrls] = useState([]);
  const [ID, setID] = useState("");

  useEffect(() => {
    if (Object.keys(updateState).length > 0) {
      setEventName(updateState?.message?.event);
      setYear(updateState?.message?.year);
      setFileUrls(updateState?.message?.images);
      setID(updateState?.message?._id);
    }
  }, [updateState]);

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) {
      if (Object.keys(updateState).length > 0) {
        toast.promise(fetchUpdateGallery(
          { images: fileUrls, event: eventName, year: year }, ID), {
          loading: `Updating...`,
          success: (res) => {
            console.log(res);
            window.location.reload();
            return "Update completed";
          },
          error: "Error updating",
        });
        return;
      }

      toast.promise(fetchAddGallery({ images: fileUrls, event: eventName, year: year }), {
        loading: `Uploading...`,
        success: (res) => {
          console.log(res);
          window.location.reload();
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

  const handleUpload = async () => {
    if (eventName.length <= 0) return toast.error("Event name required.");
    if (files.length <= 0) return toast.error("Files required for upload.");
    await handleSingleUpload(files.reverse(), 1, files.length);
  };

  const handleUpdate = async () => {
    if (eventName.length <= 0) return toast.error("Event name required.");
    if (files.length <= 0 && fileUrls.length <= 0) return toast.error("Files required for upload.");
    if (files.length <= 0) {
      toast.promise(fetchUpdateGallery(
        { images: fileUrls, event: eventName, year: year }, ID), {
        loading: `Uploading...`,
        success: (res) => {
          console.log(res);
          window.location.reload();
          return "Upload completed";
        },
        error: "Error uploading",
      });
      return;
    }
    await handleSingleUpload(files.reverse(), 1, files.length);
  };

  const yearOptions = () => {
    let options = [];
    for (let i = new Date().getFullYear(); i >= 2010; i--) {
      options.push(`${i} - ${i + 1}`);
    }
    return options;
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>{Object.keys(updateState).length <= 0 ? "Upload" : "Update"} Images</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <p>
            The first uploaded image will be on the top during display in the
            gallery page.<br></br>
            Only .jpg/.png files are supported.<br></br>
          </p>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[eventName, setEventName]}
            title="Event Name"
            placeholder="Enter Event Name"
            className="w-1/2"
          />
          <Dropdown
            title="Year"
            valueState={[year, setYear]}
            options={yearOptions()}
            className="w-1/2"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images to be uploaded"
            className="w-3/4"
            fileState={[files, setFiles]}
            urlState={[fileUrls, setFileUrls]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button className="w-3/4" text="Upload" handleClick={handleUpload} />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update Images"} handleClick={handleUpdate} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddImage;
