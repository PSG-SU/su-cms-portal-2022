import React, { useState } from "react";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";

const AddImage = () => {
  const [file, setFile] = useState(null);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Upload Logo</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <FileUpload
            title="Image to be uploaded"
            fileState={[file, setFile]} />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Upload" />
        </div>
      </div>
    </section>
  );
};

export default AddImage;
