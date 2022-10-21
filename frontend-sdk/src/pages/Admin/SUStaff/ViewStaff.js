/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";

const ViewStaff = () => {
  const [data, setData] = useState([]);

  const { refreshToken } = useContext(RefreshContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/suteam")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View SU Team Staffs</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Name", "Role", "Image"]}
          tdata={data}
          tkeys={["name", "role", "image_url"]}
          className={`${
            data.length < 8
              ? "max-h-[calc(100vh-20rem)]"
              : "h-[calc(100vh-20rem)]"
          } w-full`}
          tratio="1fr 1fr 0.5fr"
          url="http://localhost:8080/api/suteam"
        />
      </div>
    </section>
  );
};

export default ViewStaff;
