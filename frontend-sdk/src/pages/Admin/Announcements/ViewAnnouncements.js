/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { AnnouncementsTabContext } from ".";
import { ANNOUNCEMENTS_URL } from "../../../API/config";

const ViewAnnouncements = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = ANNOUNCEMENTS_URL;

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

  const { updateByID } = useContext(AnnouncementsTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Announcements</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Title", "Date", "Type", "Link"]}
          tdata={data}
          tkeys={["title", "date", "type", "link"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="30ch 1fr 1fr 25ch"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewAnnouncements;
