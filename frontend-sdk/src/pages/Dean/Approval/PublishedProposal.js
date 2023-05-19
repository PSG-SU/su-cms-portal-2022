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
import { toast } from "react-hot-toast";
import { fetchUpdateProposal } from "../../../API/calls";

const PublishedProposal = () => {
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
        .get(`${url}/published/${cid}`)
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
      .get(`${url}/all_published`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  const UndoButton = async (id) => {
    const postBody = {
      status: "facApproved"
    };
    toast.promise(fetchUpdateProposal(postBody, id)
      .then((res) => {
        refreshPage();
      }), {
      loading: "Undoing...",
      success: "Undo Successful",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const { updateByID } = useContext(ProposalContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Published Proposals</Heading>
      <div className="mt-8 lg:pr-[20%] flex items-center w-full space-x-4">
        <Dropdown
          valueState={[username, setUsername]}
          title="Club / Association Name"
          placeholder="Select a Club / Association"
          options={clubs.map((club) => club.clubName)}
          className="w-1/2"
        />
        {username && (
          <button
            className="rounded-full mt-8 bg-[#E5E5E5] p-1 hover:bg-cloud hover:text-white z-40"
            onClick={clearUsername}
          >
            <IoCloseOutline />
          </button>
        )}
      </div>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
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
          UndoButton={UndoButton}
          clubs={clubs}
        />
      </div>
    </section>
  );
};

export default PublishedProposal;
