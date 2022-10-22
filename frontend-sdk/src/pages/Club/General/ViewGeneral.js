import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import ModalImage from "react-modal-image";

const ViewGeneral = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/club/general")
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
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <ModalImage
            className="w-36 h-36 rounded-full"
            small={content[content.length - 1]?.image_url}
            large={content[content.length - 1]?.image_url}
            alt="Image URL"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>Description</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          {content[content.length - 1]?.content}
        </div>

      </div>
    </section>
  );
};

export default ViewGeneral;
