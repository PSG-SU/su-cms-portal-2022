/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";

const ViewMembers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts/")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setData(json);
    //   });
    axios
      .get("http://localhost:8080/api/office-bearers")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Members</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Name", "Role", "Year", "Dept", "Image"]}
          tdata={data}
          tkeys={["name", "role", "year", "deptyos", "image_url"]}
          tratio="0.5fr 1fr 1fr 1fr 1fr"
          className="h-[calc(100vh-20rem)] w-full"
        />
      </div>
    </section>
  );
};

export default ViewMembers;
