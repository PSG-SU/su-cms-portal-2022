import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUpdateGeneral, fetchUploadFile } from "../../../API/calls";
import { GENERAL_URL, AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";

const AddGeneral = () => {
  const [file, setFile] = useState(null);
  const [value, setvalue] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get(`${GENERAL_URL}/${user}`)
        .then((res) => {
          console.log(res.data);
          setContent(res.data);
          setvalue(res.data?.content);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [user]);

  const handlePost = async () => {
    if (!file) {
      toast.promise(fetchUpdateGeneral({ user: user, content: value }, user), {
        loading: "Adding...",
        success: (res) => {
          window.location.reload();
          return "Added Successfully";
        },
        error: (err) => `Error: ${err.response.data.error}`,
      });
      return;
    }
    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        const postBody = {
          user: user,
          image_url: res.data.url,
          content: value
        };
        toast.promise(fetchUpdateGeneral(postBody, user), {
          loading: "Adding...",
          success: (res) => {
            window.location.reload();
            return "Added Successfully";
          },
          error: (err) => `Error: ${err.response.data.error}`,
        });
        return "Uploaded";
      },
      error: "Error Occured",
    });
  };


  return (
    <section className="px-8 py-8 w-full">
      <Heading>Upload Logo</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <FileUpload
            title="Image to be uploaded"
            fileState={[file, setFile]}
            url={content?.image_url}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Description</Heading>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="About the club / association"
            placeholder="Enter about home page"
            valueState={[value, setvalue]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Update" handleClick={handlePost} />
        </div>
      </div>
    </section>
  );
};

export default AddGeneral;
