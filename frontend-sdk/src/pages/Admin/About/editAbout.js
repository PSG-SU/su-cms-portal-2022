import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchAddAbout } from "../../../API/calls";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";

const EditAbout = () => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    const postBody = {
      content: content
    };
    toast.promise(fetchAddAbout(postBody), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

return (
  <section className="px-8 py-8 w-full">
    <Heading>Edit About</Heading>
    <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
      <div className="flex items-center w-full space-x-4 mt-4">
        <TextArea
          title="About"
          placeholder="Enter about home page"
          valueState={[content, setContent]}
        />
      </div>
      <div className="flex items-center space-x-4 mt-8 w-1/2">
        <Button className="w-3/4" text="Submit" handleClick={handlePost} />
      </div>
    </div>
  </section>
);
};

export default EditAbout;
