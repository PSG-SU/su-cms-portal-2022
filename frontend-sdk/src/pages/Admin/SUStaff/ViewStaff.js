/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";
import { SUStaffTabContext } from ".";
import { SUTEAM_URL } from "../../../API/config";

const ViewStaff = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = SUTEAM_URL;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, url]);

  const { updateByID } = useContext(SUStaffTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View SU Team Staffs</Heading><br></br>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Name", "Role", "Position", "Image"]}
          tdata={data}
          tkeys={["name", "role", "position", "image_url"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 30ch 30ch 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewStaff;
