/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { LOGS_URL } from "../../../API/config";

const ViewLogs = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = LOGS_URL;

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

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Logs</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["User", "Action", "Section", "Item", "Date"]}
          tdata={data}
          tkeys={["user", "action", "section", "item", "timestamp"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          url={url}
          hideDelete
          hideUpdate
        />
      </div>
    </section>
  );
};

export default ViewLogs;
