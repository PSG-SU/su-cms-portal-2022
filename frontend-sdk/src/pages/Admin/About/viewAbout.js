import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";

const ViewAbout = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/about")
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
      <Heading>View About</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 mt-4">
          {content[content.length - 1]?.content}
        </div>
      </div>
    </section>
  );
};

export default ViewAbout;
