/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { NssNccTabContext } from ".";
import { NSS_NCC_URL } from "../../../API/config";

const ViewNssNcc = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = NSS_NCC_URL;

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

  const { updateByID } = useContext(NssNccTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View NSS / NCC Staff</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Name", "Scheme", "Priority", "Dept", "Image"]}
          tdata={data}
          tkeys={["name", "scheme", "priority", "dept", "image_url"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewNssNcc;
