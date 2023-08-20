/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { AUTH_URL, PROPOSAL_URL } from "../../../API/config";
import { toast } from "react-hot-toast";
import { fetchUpdateProposal } from "../../../API/calls";

const RejectedProposal = () => {
  const [data, setData] = useState([]);
  const [cid, setCid] = useState("");
  const { refreshPage, refreshToken } = useContext(RefreshContext);
  const url = PROPOSAL_URL;

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setCid(res.data.caID);
      })
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/rejected/${cid}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, cid, url]);

  const UndoButton = async (id) => {
    const postBody = {
      status: "pending"
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

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Rejected Proposals</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Event", "Venue", "Event Date", "Created At"]}
          tdata={data}
          tkeys={["eventName", "venue", "startDate", "createdAt"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr"
          url={url}
          UndoButton={UndoButton}
        />
      </div>
    </section>
  );
};

export default RejectedProposal;
