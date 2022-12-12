/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { ProposalContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { AUTH_URL, PROPOSAL_URL } from "../../../API/config";

const RejectedProposal = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = PROPOSAL_URL;

  useEffect(() => {
    axios
      .get(AUTH_URL)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/all_rejected`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  const { updateByID } = useContext(ProposalContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Rejected Proposals</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Event", "Club / Association", "Event Date"]}
          tdata={data}
          tkeys={["eventName", "user", "startDate"]}
          className={`${data.length < 8
              ? "max-h-[calc(100vh-20rem)]"
              : "h-[calc(100vh-20rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
          approval={true}
          users={users}
        />
      </div>
    </section>
  );
};

export default RejectedProposal;
