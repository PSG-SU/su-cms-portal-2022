/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { CLUB_URL } from "../../../API/config";
import { ClubManagementTabContext } from ".";

const ViewClubs = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = CLUB_URL;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [refreshToken]);

  const { updateByID } = useContext(ClubManagementTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Clubs</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["ID", "Club", "Category", "Image"]}
          tdata={data}
          tkeys={["clubId", "clubName", "category", "image_url"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-20rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewClubs;
