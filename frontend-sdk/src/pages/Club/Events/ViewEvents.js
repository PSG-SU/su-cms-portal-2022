/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { EventContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { PROPOSAL_URL, AUTH_URL } from "../../../API/config";

const ViewEvents = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = PROPOSAL_URL;
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get(`${url}/published/${user}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshToken, user]);

  const { updateByID } = useContext(EventContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Events</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
        <Table
          theads={["Event", "Created At", "Reg Link", "Status"]}
          tdata={data}
          tkeys={["eventName", "createdAt", "registrationLink", "status"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-20rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewEvents;
