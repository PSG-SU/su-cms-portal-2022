import React, { useState } from "react";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";

const Description = () => {
  const [value, setvalue] = useState("");

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Description</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="About the club / association"
            placeholder="Enter about home page"
            valueState={[value, setvalue]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Submit" />
        </div>
      </div>
    </section>
  );
};

export default Description;
