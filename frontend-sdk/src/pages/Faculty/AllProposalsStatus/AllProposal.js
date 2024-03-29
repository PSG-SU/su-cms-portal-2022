/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { AUTH_URL, PROPOSAL_URL } from "../../../API/config";
import { toast } from "react-hot-toast";
import { fetchGetProposalbyId, fetchUpdateProposal } from "../../../API/calls";

const AllProposal = () => {
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
      .get(`${url}/user/${cid}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, cid, url]);

  const UndoButton = async (id) => {
    const data = await fetchGetProposalbyId(id);
    if (data.data.status === "deanApproved") {
      toast.error("Cannot undo a proposal that has been approved by the dean");
      return;
    }

    if (data.data.status === "published") {
      toast.error("Cannot undo a proposal that has been published");
      return;
    }

    const postBody = {
      status: data.data.status === "approvalVerification" ? "deanApproved" : "pending"
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
      <Heading>All Proposals</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["Event", "Venue", "Event Date", "Created At", "Status"]}
          tdata={data}
          tkeys={["eventName", "venue", "startDate", "createdAt", "status"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr 1fr"
          url={url}
          UndoButton={UndoButton}
        />
      </div>
    </section>
  );
};

export default AllProposal;
