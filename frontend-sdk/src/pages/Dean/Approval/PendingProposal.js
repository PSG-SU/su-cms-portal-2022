/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { ProposalContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { AUTH_URL, CLUB_URL, PROPOSAL_URL } from "../../../API/config";
import Dropdown from "../../../components/Dropdown";

const PendingProposal = () => {
  const [data, setData] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [username, setUsername] = useState("");
  const { refreshToken } = useContext(RefreshContext);
  const url = PROPOSAL_URL;

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/all_pending`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${url}/user/${username}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username]);

  const { updateByID } = useContext(ProposalContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Pending Proposals</Heading>
      <div className="mt-8 lg:pr-[20%] flex items-center w-full space-x-4">
        <Dropdown
          valueState={[username, setUsername]}
          title="Club / Association Name"
          placeholder="Select a Club / Association"
          options={clubs.map((club) => club.clubName)}
          className="w-1/2"
        />
      </div>
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
          users={clubs}
        />
      </div>
    </section>
  );
};

export default PendingProposal;
