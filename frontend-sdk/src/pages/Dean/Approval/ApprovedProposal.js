/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import { ProposalContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { CLUB_URL, PROPOSAL_URL } from "../../../API/config";
import { IoCloseOutline } from "react-icons/io5";

const ApprovedProposal = () => {
  const [data, setData] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [cid, setCid] = useState("");
  const [username, setUsername] = useState("");
  const { refreshPage, refreshToken } = useContext(RefreshContext);
  const url = PROPOSAL_URL;

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (username) {
      setCid(clubs.filter((club) => club.clubName === username)[0].clubId);
    }
  }, [username]);

  useEffect(() => {
    console.log(cid);
    if (cid) {
      axios
        .get(`${url}/approved/${cid}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cid]);

  const clearUsername = () => {
    setUsername("");
    refreshPage();
  };

  useEffect(() => {
    axios
      .get(`${url}/all_approved`)
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
      <Heading>Approved Proposals</Heading>
      <div className="mt-8 lg:pr-[20%] flex items-center w-full space-x-4">
        <Dropdown
          valueState={[username, setUsername]}
          title="Club / Association Name"
          placeholder="Select a Club / Association"
          options={clubs.map((club) => club.clubName)}
          className="w-1/2"
        />
        <button
          className="rounded-full mt-8 bg-cloud p-1 hover:text-gray z-40"
          onClick={clearUsername}
        >
          <IoCloseOutline />
        </button>
      </div>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Event", "Club / Association", "Event Date", "Status"]}
          tdata={data}
          tkeys={["eventName", "user", "startDate", "status"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-20rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
          approval={true}
          clubs={clubs}
        />
      </div>
    </section>
  );
};

export default ApprovedProposal;
