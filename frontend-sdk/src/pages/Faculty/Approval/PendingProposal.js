/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import { ProposalContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { CLUB_URL, PROPOSAL_URL, AUTH_URL } from "../../../API/config";
import { IoCloseOutline } from "react-icons/io5";
import DateInput from "../../../components/DateInput";
import { toast } from "react-hot-toast";
import { fetchUpdateProposal } from "../../../API/calls";

const PendingProposal = () => {
  const [data, setData] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [cid, setCid] = useState("");
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
      .get(`${url}/pending/${cid}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, cid]);

  const { updateByID } = useContext(ProposalContext);

  const ApproveButton = async (id) => {
    const postBody = {
      status: "facApproved"
    };
    toast.promise(fetchUpdateProposal(postBody, id)
      .then((res) => {
        refreshPage();
      }), {
      loading: "Approving...",
      success: "Approved Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const RejectButton = async (id) => {
    const postBody = {
      status: "rejected"
    };
    toast.promise(fetchUpdateProposal(postBody, id)
      .then((res) => {
        refreshPage();
      }), {
      loading: "Rejecting...",
      success: "Rejected Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Pending Proposals</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Event", "Venue", "Event Date", "Created At"]}
          tdata={data}
          tkeys={["eventName", "venue", "startDate", "createdAt"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-20rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 1fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
          ApproveButton={ApproveButton}
          RejectButton={RejectButton}
        />
      </div>
    </section>
  );
};

export default PendingProposal;
