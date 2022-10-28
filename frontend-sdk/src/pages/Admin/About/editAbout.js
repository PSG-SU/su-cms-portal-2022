import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUpdateAbout, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import { ABOUT_URL } from "../../../API/config";
import axios from "axios";

const EditAbout = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [file_url, setFile_url] = useState("");

  useEffect(() => {
    axios.get(ABOUT_URL).then((res) => {
      setContent(res.data[0].content);
    });
  }, []);

  const handleUpdate = async () => {
    if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading...",
        success: (res) => {
          setFile_url(res.data.url);
          const postBody = {
            content: content,
            file_url: res.data.url,
          };
          toast.promise(fetchUpdateAbout(postBody), {
            loading: "Adding...",
            success: "Added Successfully",
            error: (err) => `Error: ${err.response.data.error}`,
          });
          window.location.reload();
          return "Uploaded";
        },
        error: "Error Occured",
      });
    } else {
      const postBody = {
        content: content,
      };
      toast.promise(fetchUpdateAbout(postBody), {
        loading: "Adding...",
        success: "Added Successfully",
        error: (err) => `Error: ${err.response.data.error}`,
      });
      window.location.reload();
    }
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Edit About</Heading>
      <div className="w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="About"
            placeholder="Enter about home page"
            valueState={[content, setContent]}
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>SU by Law</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <FileUpload
            fileState={[file, setFile]}
            title="Upload File"
            className="w-1/2"
            url={file_url}
            pdf={true}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Submit" handleClick={handleUpdate} />
        </div>
      </div>
    </section>
  );
};

export default EditAbout;
