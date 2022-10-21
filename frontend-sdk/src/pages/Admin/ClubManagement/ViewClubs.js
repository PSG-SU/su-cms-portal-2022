/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";

const ViewClubs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clubs")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Clubs</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Club", "ID", "Category"]}
          tdata={data}
          tkeys={["clubName", "clubId", "category"]}
          tratio="1fr 1fr 1fr"
          className={`${
            data.length < 8
              ? "max-h-[calc(100vh-20rem)]"
              : "h-[calc(100vh-20rem)]"
          } w-full`}
          // delete={handleDelete}
        />
      </div>
    </section>
  );
};

export default ViewClubs;
