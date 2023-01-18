import axios from "axios";
import React, { createContext, useState } from "react";
import PendingProposal from "./PendingProposal";
import FacApprovedProposal from "./FacApprovedProposal";
import DeanApprovedProposal from "./DeanApprovedProposal";
import RejectedProposal from "./RejectedProposal";
import PublishedProposal from "./PublishedProposal";
import AllProposal from "./AllProposal";
import { PROPOSAL_URL } from "../../../API/config";
import toast from "react-hot-toast";

export const ProposalContext = createContext();

const Proposal = () => {
  const initialTabMenuItems = [
    {
      text: "All",
      tab: <AllProposal />,
    },
    {
      text: "Pending",
      tab: <PendingProposal />,
    },
    {
      text: "Approved By Faculty",
      tab: <FacApprovedProposal />,
    },
    {
      text: "Approved By Dean",
      tab: <DeanApprovedProposal />,
    },
    {
      text: "Rejected",
      tab: <RejectedProposal />,
    },
    {
      text: "Published",
      tab: <PublishedProposal />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [updateState, setUpdateState] = useState({});
  const [tabMenuItems, setTabMenuItems] = useState(initialTabMenuItems);

  const updateByID = (id) => {
    axios
      .get(`${PROPOSAL_URL}/${id}`)
      .then((res) => {
        setUpdateState(res.data);
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Update Proposal";
        setTabMenuItems(tempTabMenuItems);
      })
      .catch((err) => {
        setUpdateState({});
        toast("Error Updating");
        console.log(err);
      });
    setSelected(0);
  };

  return (
    <ProposalContext.Provider
      value={{ selectedTab: selected, updateByID, updateState }}
    >
      <section className="">
        <div className="h-fit bg-gray px-8 pt-8">
          <p className="text-lg uppercase tracking-wider mb-8">EVENT PROPOSAL</p>
          <header className="flex">
            {tabMenuItems.map((item, idx) => {
              return (
                <button
                  onClick={() => setSelected(idx)}
                  key={idx}
                  style={
                    selected === idx
                      ? {
                        WebkitBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        MozBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        boxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        clipPath:
                          "polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%)",
                      }
                      : {}
                  }
                  className={`${selected === idx &&
                    "bg-white rounded-t-lg box-border  font-semibold"
                    } px-6 py-4`}
                >
                  <p className="">{item.text}</p>
                </button>
              );
            })}
          </header>
        </div>
        {tabMenuItems[selected].tab}
      </section>
    </ProposalContext.Provider>
  );
};

export default Proposal;