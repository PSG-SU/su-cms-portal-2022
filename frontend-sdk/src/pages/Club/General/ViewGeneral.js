import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import ModalImage from "react-modal-image";
import { GENERAL_URL, AUTH_URL } from "../../../API/config";

const ViewGeneral = () => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");

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
          setContent(res.data.general);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [user]);

  return (
    <section className="px-8 py-8 w-full">
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <div className="w-1/2 space-y-6">
            <Heading>Logo</Heading>
            {content?.image_url ? (
              <ModalImage
                className="w-36 h-36 rounded-full"
                small={content?.image_url}
                large={content?.image_url}
                alt="Image URL"
              />
            ) :
              (<p>No logo found !</p>
              )}
          </div>
          <div className="w-1/2 space-y-6">
            <Heading>Banner</Heading>
            {content?.banner_url ? (
              <ModalImage
                className="w-36 h-36 rounded-full"
                small={content?.banner_url}
                large={content?.banner_url}
                alt="Image URL"
              />
            ) :
              (<p>No logo found !</p>
              )}
          </div>
        </div>

        <div className="w-full space-y-4 mt-8">
          <Heading>Tagline</Heading>
          <p>{content?.tagline ? content?.tagline : "No tagline found !"}</p>
        </div>

        <div className="w-full space-y-4 mt-8">
          <Heading>Description</Heading>
          <p>{content?.description ? content?.description : "No description found !"}</p>
        </div>

        <div className="flex flex-row w-full mt-8">
          <div className="w-1/2 space-y-2">
            <Heading>Contact 1</Heading>
            <p className="font-semibold">{content?.contactName1 ? content?.contactName1 : "No name found !"}</p>
            <p>{content?.contactNumber1 ? content?.contactNumber1 : "No phone number found !"}</p>
            <p>{content?.contactEmail1 ? content?.contactEmail1 : "No email found !"}</p>
          </div>
          <div className="w-1/2 space-y-2">
            <Heading>Contact 2</Heading>
            <p className="font-semibold">{content?.contactName2 ? content?.contactName2 : "No name found !"}</p>
            <p>{content?.contactNumber2 ? content?.contactNumber2 : "No phone number found !"}</p>
            <p>{content?.contactEmail2 ? content?.contactEmail2 : "No email found !"}</p>
          </div>
        </div>

        <div className="w-full space-y-6 mt-8">
          <Heading>Socials</Heading>
          <div className="flex flex-row space-x-4">
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">Instagram</p>
              <p>{content?.instagram ? content?.instagram : "No instagram link found !"}</p>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">LinkedIn</p>
              <p>{content?.linkedin ? content?.linkedin : "No linkedin link found !"}</p>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">Linktree</p>
              <p>{content?.linktree ? content?.linktree : "No linktree link found !"}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">Youtube</p>
              <p>{content?.youtube ? content?.youtube : "No instagram link found !"}</p>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">Facebook</p>
              <p>{content?.facebook ? content?.facebook : "No facebook link found !"}</p>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="font-semibold">Twitter</p>
              <p>{content?.twitter ? content?.twitter : "No twitter link found !"}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ViewGeneral;
