import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import MultipleFiles from "../../../components/MultipleFiles";
import { fetchAddBug, fetchUpdateBug, fetchUploadFile } from "../../../API/calls";
import { BugsTabContext } from ".";

const AddBugs = () => {
  const { updateState } = useContext(BugsTabContext);

  const [ID, setID] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const username = localStorage.getItem("userId");

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setType(updateState?.type);
      setTitle(updateState?.title);
      setDesc(updateState?.desc);
      setFileUrls(updateState?.fileUrls);
      setID(updateState?._id);
    }
  }, [updateState]);

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) {
      if (Object.keys(updateState).length > 0) {
        toast.promise(fetchUpdateBug({
          title: title,
          desc: desc,
          type: type,
          fileUrls: fileUrls,
          dateTime: new Date(),
        }, ID), {
          loading: `Updating...`,
          success: (res) => {
            window.location.reload();
            return "Update completed";
          },
          error: "Error updating",
        });
        return;
      }

      toast.promise(fetchAddBug({
        title: title,
        desc: desc,
        type: type,
        fileUrls: fileUrls,
        status: "pending",
        dateTime: new Date(),
        user: username,
      }), {
        loading: `Uploading...`,
        success: (res) => {
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

  const handlePost = async () => {
    if (title.length <= 0 || desc.length <= 0) return toast.error("Title and description required.");

    if (files.length <= 0) {
      toast.promise(fetchAddBug({
        title: title,
        desc: desc,
        type: type,
        fileUrls: fileUrls,
        status: "pending",
        dateTime: new Date(),
        user: username,
      }), {
        loading: `Uploading...`,
        success: (res) => {
          window.location.reload();
          return "Upload completed";
        },
        error: "Error uploading",
      });
      return;
    } else {
      await handleSingleUpload(files.reverse(), 1, files.length);
    }
  };

  const handleUpdate = async () => {
    if (title.length <= 0 || desc.length <= 0) return toast.error("Title and description required.");

    if (files.length <= 0) {
      toast.promise(fetchUpdateBug({
        title: title,
        desc: desc,
        type: type,
        fileUrls: fileUrls,
        dateTime: new Date(),
      }, ID), {
        loading: `Uploading...`,
        success: (res) => {
          window.location.reload();
          return "Upload completed";
        },
        error: "Error uploading",
      });
      return;
    }
    await handleSingleUpload(files.reverse(), 1, files.length);
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>
        {Object.keys(updateState).length <= 0 ? "Report" : "Update"} Bug / Feature Request
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[type, setType]}
            title="Select Type"
            options={[
              "Bug / Issue",
              "Feature Request / Suggestion",
            ]}
            className="w-1/2"
          />
          <Inputfield
            valueState={[title, setTitle]}
            title="Title"
            placeholder="Enter a title"
            className="w-1/2"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            valueState={[desc, setDesc]}
            title="Description"
            placeholder="Enter a description"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images (Optional)"
            className="w-3/4"
            fileState={[files, setFiles]}
            urlState={[fileUrls, setFileUrls]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text={"Confirm"}
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Cancel"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update"} handleClick={handleUpdate} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddBugs;
