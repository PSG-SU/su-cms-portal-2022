import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import ModalImage from "react-modal-image";
import { GENERAL_URL } from "../../../API/config";

const ViewGeneral = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${GENERAL_URL}/${localStorage.getItem("userId")}`)
      .then((res) => {
        console.log(res.data);
        setContent(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Logo</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <ModalImage
            className="w-36 h-36 rounded-full"
            small={content?.image_url}
            large={content?.image_url}
            alt="Image URL"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Description</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          {content?.content}
        </div>

      </div>
    </section>
  );
};

export default ViewGeneral;
