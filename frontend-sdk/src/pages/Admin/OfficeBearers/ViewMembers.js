/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { OfficeBearersTabContext } from ".";
import { OFFICE_BEARERS_URL } from "../../../API/config";

const ViewMembers = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = OFFICE_BEARERS_URL;

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

  const { updateByID } = useContext(OfficeBearersTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Members</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Name", "Role", "Year", "Dept", "Image"]}
          tdata={data}
          tkeys={["name", "role", "year", "deptyos", "image_url"]}
          className={`${data.length < 8
              ? "max-h-[calc(100vh-20rem)]"
              : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="25ch 1fr 1fr 1fr 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewMembers;
