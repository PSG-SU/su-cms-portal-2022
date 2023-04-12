import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUpdateGeneral, fetchUploadFile } from "../../../API/calls";
import { GENERAL_URL, AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import Inputfield from "../../../components/TextInput";

const AddGeneral = () => {
  const [file, setFile] = useState(null);
  const [banner, setBanner] = useState(null);
  const [value, setvalue] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [tagline, setTagline] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [mail1, setMail1] = useState("");
  const [mail2, setMail2] = useState("");

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
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-16rem)] overflow-auto">

        <div className="flex flex-row w-full gap-x-8">
          <div className="flex flex-col w-1/2">
            <Heading>Upload Logo</Heading>
            <div className="flex items-center w-full space-x-4 mt-4">
              <FileUpload
                title="Image to be uploaded"
                fileState={[file, setFile]}
                url={content?.image_url}
              />
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <Heading>Upload Banner Image</Heading>
            <div className="flex items-center w-full space-x-4 mt-4">
              <FileUpload
                title="Image to be uploaded"
                fileState={[banner, setBanner]}
                url={content?.banner_url}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Tagline</Heading>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[tagline, setTagline]}
            title="Enter your club's tagline"
            placeholder="Tagline"
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

        <div className="flex flex-row w-full gap-x-8 mt-12">
          <div className="flex flex-col w-1/2">
            <Heading>Contact Details 1</Heading>
            <div className="flex flex-col items-center w-full space-y-4 mt-4">
              <Inputfield
                valueState={[name1, setName1]}
                title="Name"
                placeholder="Eg. John Doe"
              />
              <Inputfield
                valueState={[num1, setNum1]}
                title="Phone Number"
                placeholder="Eg. 9876543210"
              />
              <Inputfield
                valueState={[mail1, setMail1]}
                title="Email"
                placeholder="Eg. someone@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <Heading>Contact Details 2</Heading>
            <div className="flex flex-col items-center w-full space-y-4 mt-4">
              <Inputfield
                valueState={[name2, setName2]}
                title="Name"
                placeholder="Eg. John Doe"
              />
              <Inputfield
                valueState={[num2, setNum2]}
                title="Phone Number"
                placeholder="Eg. 9876543210"
              />
              <Inputfield
                valueState={[mail2, setMail2]}
                title="Email"
                placeholder="Eg. someone@example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Update" handleClick={handlePost} />
        </div>
      </div>
    </section>
  );
};

export default AddGeneral;
