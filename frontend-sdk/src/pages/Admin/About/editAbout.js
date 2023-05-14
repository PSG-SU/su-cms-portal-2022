import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUpdateAbout, fetchUploadFile } from "../../../API/calls";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import TextArea from "../../../components/TextArea";
import { ABOUT_URL } from "../../../API/config";
import axios from "axios";
import Inputfield from "../../../components/TextInput";

const EditAbout = () => {
  const [content, setContent] = useState("");
  const [tagline, setTagline] = useState("");
  const [ourMission, setOurMission] = useState("");
  const [ourPlan, setOurPlan] = useState("");
  const [ourVision, setOurVision] = useState("");
  const [aboutCollege, setAboutCollege] = useState("");
  const [numberOfSchemes, setNumberOfSchemes] = useState(0);
  const [numberOfWings, setNumberOfWings] = useState(0);
  const [file, setFile] = useState(null);
  const [file_url, setFile_url] = useState("");

  useEffect(() => {
    axios.get(ABOUT_URL).then((res) => {
      setContent(res.data?.content ? res.data.content : "");
      setTagline(res.data?.tagline ? res.data.tagline : "");
      setOurMission(res.data?.ourMission ? res.data.ourMission : "");
      setOurPlan(res.data?.ourPlan ? res.data.ourPlan : "");
      setOurVision(res.data?.ourVision ? res.data.ourVision : "");
      setAboutCollege(res.data?.aboutCollege ? res.data.aboutCollege : "");
      setNumberOfSchemes(res.data?.numberOfSchemes ? res.data.numberOfSchemes : 0);
      setNumberOfWings(res.data?.numberOfWings ? res.data.numberOfWings : 0);
    }).catch(err => console.log(err));
  }, []);

  const handleUpdate = async () => {
    if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading...",
        success: (res) => {
          setFile_url(res.data.url);
          const postBody = {
            content: content,
            tagline: tagline,
            ourMission: ourMission,
            ourPlan: ourPlan,
            ourVision: ourVision,
            aboutCollege: aboutCollege,
            numberOfSchemes: numberOfSchemes,
            numberOfWings: numberOfWings,
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
        tagline: tagline,
        ourMission: ourMission,
        ourPlan: ourPlan,
        ourVision: ourVision,
        aboutCollege: aboutCollege,
        numberOfSchemes: numberOfSchemes,
        numberOfWings: numberOfWings,
      };
      toast.promise(fetchUpdateAbout(postBody), {
        loading: "Updating...",
        success: (res) => {
          window.location.reload();
          return "Updated Successfully";
        },
        error: (err) => `Error: ${err.response.data.error}`,
      });
    }
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Edit Details</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="Tagline"
            placeholder="Enter tagline"
            valueState={[tagline, setTagline]}
            className="w-3/4"
          />
          <div className="w-1/4">
            <Inputfield
              title="Number of Schemes"
              placeholder="Enter number of schemes"
              valueState={[numberOfSchemes, setNumberOfSchemes]}
              className="w-full"
            />
            <Inputfield
              title="Number of Wings"
              placeholder="Enter number of wings"
              valueState={[numberOfWings, setNumberOfWings]}
              className="w-full mt-2"
            />
          </div>
        </div>

        <div className="flex items-center w-full space-x-4 mt-8">
          <TextArea
            title="About Us - Students Union"
            placeholder="Enter about us section for students union"
            valueState={[content, setContent]}
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-8">
          <TextArea
            title="Our Mission"
            placeholder="Enter our mission"
            valueState={[ourMission, setOurMission]}
          />
          <TextArea
            title="Our Plan"
            placeholder="Enter our plan"
            valueState={[ourPlan, setOurPlan]}
          />
          <TextArea
            title="Our Vision"
            placeholder="Enter our vision"
            valueState={[ourVision, setOurVision]}
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-8">
          <TextArea
            title="About the College"
            placeholder="Enter about us section for college"
            valueState={[aboutCollege, setAboutCollege]}
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
