/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";

const ViewStaff = () => {
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
        console.log(json);
      });
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View SU Team Staffs</Heading>
      <div className="mt-8  w-3/4">
        <Table
          theads={["Name", "Role"]}
          tdata={data}
          tkeys={["name", "role"]}
          className="h-[calc(100vh-20rem)] w-full"
        />
      </div>
    </section>
  );
};

export default ViewStaff;
