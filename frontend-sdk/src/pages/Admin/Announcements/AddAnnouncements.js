import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import TextArea from "../../../components/TextArea";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchAddAnnouncement, fetchUpdateAnnouncement } from "../../../API/calls";
import { AnnouncementsTabContext } from ".";

const AddAnnouncements = () => {
  const { updateState } = useContext(AnnouncementsTabContext);

  const [ID, setID] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("")

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setTitle(updateState?.title);
      setBody(updateState?.body);
      setDate(updateState?.date);
      setType(updateState?.type);
      setLink(updateState?.link);
      setID(updateState?._id);
    }
  }, [updateState]);

  const handlePost = async () => {
    const postBody = {
      title: title,
      body: body,
      date: date,
      type: type,
      link: link,
    };
    toast.promise(fetchAddAnnouncement(postBody)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleUpdate = async () => {
    const postBody = {
      title: title,
      body: body,
      date: date,
      type: type,
      link: link,
    };
    toast.promise(fetchUpdateAnnouncement(postBody, ID)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} Announcement
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[title, setTitle]}
            title="Title"
            placeholder="Eg. INTRAMS 2022"
            className="w-1/2"
          />
          <Inputfield
            valueState={[date, setDate]}
            title="Date (Optional)"
            placeholder="Eg. 24th - 26th March 2023"
            className="w-1/2"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Description"
            placeholder="Enter description"
            valueState={[body, setBody]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          {/* <Dropdown
            valueState={[type, setType]}
            title="Type (Optional)"
            placeholder="Select a type"
            options={[
              "Event",
              "Classified",
            ]}
            className="w-1/2"
          /> */}
          <Inputfield
            valueState={[type, setType]}
            title="Subtitle (Optional)"
            placeholder="Eg. Circular"
            className="w-1/2"
          />
          <Inputfield
            valueState={[link, setLink]}
            title="Link (Optional)"
            placeholder="Eg. https://www.psgtech.edu/intrams2022/"
            className="w-1/2"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text={"Add Announcement"}
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-full" text={"Update Announcement"} handleClick={handleUpdate} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddAnnouncements;
