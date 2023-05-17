import React, { useState, useEffect } from "react";
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
  const [user, setUser] = useState("");
  const [content, setContent] = useState({});
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [mail1, setMail1] = useState("");
  const [mail2, setMail2] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [linktree, setLinktree] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("")

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
          setTagline(res.data?.general?.tagline ? res.data?.general?.tagline : "")
          setDescription(res.data?.general?.description ? res.data?.general?.description : "");
          setName1(res.data?.general?.contactName1 ? res.data?.general?.contactName1 : "");
          setName2(res.data?.general?.contactName2 ? res.data?.general?.contactName2 : "");
          setNum1(res.data?.general?.contactNumber1 ? res.data?.general?.contactNumber1 : "");
          setNum2(res.data?.general?.contactNumber2 ? res.data?.general?.contactNumber2 : "");
          setMail1(res.data?.general?.contactEmail1 ? res.data?.general?.contactEmail1 : "");
          setMail2(res.data?.general?.contactEmail2 ? res.data?.general?.contactEmail2 : "");
          setWebsite(res.data?.general?.website ? res.data?.general?.website : "");
          setInstagram(res.data?.general?.instagram ? res.data?.general?.instagram : "");
          setLinkedin(res.data?.general?.linkedin ? res.data?.general?.linkedin : "");
          setLinktree(res.data?.general?.linktree ? res.data?.general?.linktree : "");
          setYoutube(res.data?.general?.youtube ? res.data?.general?.youtube : "");
          setFacebook(res.data?.general?.facebook ? res.data?.general?.facebook : "");
          setTwitter(res.data?.general?.twitter ? res.data?.general?.twitter : "");
          setDiscord(res.data?.general?.discord ? res.data?.general?.discord : "");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [user]);

  const handlePost = async () => {
    let postBody = {
      user: user,
      description: description,
      tagline: tagline,
      contactName1: name1,
      contactName2: name2,
      contactNumber1: num1,
      contactNumber2: num2,
      contactEmail1: mail1,
      contactEmail2: mail2,
      website: website,
      instagram: instagram,
      linkedin: linkedin,
      linktree: linktree,
      youtube: youtube,
      facebook: facebook,
      twitter: twitter,
      discord: discord,
    }

    if (file && banner) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading Logo...",
        success: (res1) => {
          toast.promise(fetchUploadFile(banner), {
            loading: "Uploading Banner...",
            success: (res2) => {
              postBody = {
                ...postBody,
                image_url: res1.data.url,
                banner_url: res2.data.url,
              }
              toast.promise(fetchUpdateGeneral(postBody, user), {
                loading: "Updating...",
                success: (res) => {
                  window.location.reload();
                  return "Updated Successfully";
                },
                error: (err) => `Error: ${err.response.data.error}`,
              });
              return "Uploaded";
            },
            error: "Error Occured",
          });
          return "Uploaded";
        },
        error: "Error Occured",
      });
    } else if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading Logo...",
        success: (res1) => {
          postBody = {
            ...postBody,
            image_url: res1.data.url,
          }
          toast.promise(fetchUpdateGeneral(postBody, user), {
            loading: "Updating...",
            success: (res) => {
              window.location.reload();
              return "Updated Successfully";
            },
            error: (err) => `Error: ${err.response.data.error}`,
          });
          return "Uploaded";
        }
      })
    } else if (banner) {
      toast.promise(fetchUploadFile(banner), {
        loading: "Uploading Banner...",
        success: (res2) => {
          postBody = {
            ...postBody,
            banner_url: res2.data.url,
          }
          toast.promise(fetchUpdateGeneral(postBody, user), {
            loading: "Updating...",
            success: (res) => {
              window.location.reload();
              return "Updated Successfully";
            },
            error: (err) => `Error: ${err.response.data.error}`,
          });
          return "Uploaded";
        }
      })
    } else {
      toast.promise(fetchUpdateGeneral(postBody, user), {
        loading: "Updating...",
        success: (res) => {
          window.location.reload();
          return "Updated Successfully";
        },
        error: (err) => {
          console.log(err);
          return `Error: ${err.response.data.error}`
        },
      });
    }
  };


  return (
    <section className="px-8 py-8 w-full">
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">

        <div className="flex flex-row w-full gap-x-8">
          <div className="flex flex-col w-1/2">
            <Heading>Upload Logo</Heading>
            <div className="flex items-center w-full space-x-4 mt-4">
              <FileUpload
                title="Image to be uploaded"
                fileState={[file, setFile]}
                url={content?.general?.image_url}
              />
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <Heading>Upload Banner Image</Heading>
            <div className="flex items-center w-full space-x-4 mt-4">
              <FileUpload
                title="Image to be uploaded"
                fileState={[banner, setBanner]}
                url={content?.general?.banner_url}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-x-8">
          <div className="flex flex-col w-1/2">
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
          </div>

          <div className="flex flex-col w-1/2">
            <div className="flex items-center w-full space-x-4 mt-12">
              <Heading>Website Link</Heading>
            </div>
            <div className="flex items-center w-full space-x-4 mt-4">
              <Inputfield
                valueState={[website, setWebsite]}
                title="Enter your club's website link"
                placeholder="Website"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Description</Heading>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <TextArea
            title="About the club / association"
            placeholder="Club Description"
            valueState={[description, setDescription]}
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
                placeholder="Eg. 98765 43210"
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
                placeholder="Eg. 98765 43210"
              />
              <Inputfield
                valueState={[mail2, setMail2]}
                title="Email"
                placeholder="Eg. someone@example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Socials</Heading>
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[instagram, setInstagram]}
            title="Instagram Profile Link"
          />
          <Inputfield
            valueState={[linkedin, setLinkedin]}
            title="LinkedIn Profile Link"
          />
          <Inputfield
            valueState={[linktree, setLinktree]}
            title="Linktree Link"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[youtube, setYoutube]}
            title="Youtube Channel Link"
          />
          <Inputfield
            valueState={[facebook, setFacebook]}
            title="Facebook Page Link"
          />
          <Inputfield
            valueState={[twitter, setTwitter]}
            title="Twitter Profile Link"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[discord, setDiscord]}
            title="Discord Server Link"
            className="w-1/3"
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
