/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";

const ViewMembers = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [deptyos, setDeptyos] = useState("");
  const [acayear, setAcayear] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Members</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["User ID", "ID", "Title"]}
          tdata={data}
          tkeys={["userId", "id", "title"]}
          tratio="1fr 1fr 2fr"
          className="h-[calc(100vh-20rem)] w-full"
        />
      </div>
    </section>
  );
};

export default ViewMembers;
