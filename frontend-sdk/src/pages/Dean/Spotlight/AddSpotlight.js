import React, { useState } from "react";
// import Table from "../../../components/Table";
import Inputfield from "../../../components/TextInput";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import { fetchAddSpotlight } from "../../../API/calls";
import toast from "react-hot-toast";

const AddSpotlight = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");


  const handleAddSpotlight = async () => {
    console.log({
      "title" : title,
      "description" : description,
      "name" : name,
      "url" : url
    })
    fetchAddSpotlight({
      "title" : title,
      "description" : description,
      "name" : name,
      "url" : url
    }).then(res => {
      toast.success("Spotlight Added Successfully");
      window.location.reload();
    }).catch(err => {
      toast.error("Error: " + err.response.data.error);
    })
  }

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Add Spotlight</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center space-x-4 mt-4">
          <Inputfield
            valueState={[title, setTitle]}
            title="Title"
            placeholder="Enter Title"
          />
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            // isDisabled={Object.keys(updateState).length > 0}
            placeholder="Enter Name"
          />
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Inputfield
            valueState={[description, setDescription]}
            title="Description"
            // isDisabled={Object.keys(updateState).length > 0}
            placeholder="Enter Description"
          />
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Inputfield
            valueState={[url, setUrl]}
            title="Url"
            // isDisabled={Object.keys(updateState).length > 0}
            placeholder="Enter Reference Link"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-8">
          <Button className="w-1/4" text={"Add User"} handleClick={handleAddSpotlight}/>
        </div>
      </div>
    </section>
  );
};

export default AddSpotlight;
