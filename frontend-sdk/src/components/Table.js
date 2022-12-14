import React, { useContext, useEffect, useState } from "react";
import { BsCheck2Circle, BsPencil, BsCloudArrowUpFill } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdDownload, IoMdTime } from "react-icons/io";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import ModalImage from "react-modal-image";
import axios from "axios";
import { toast } from "react-hot-toast";
import html2pdf from "html2pdf.js";

import { RefreshContext } from "../Refresher";
import Button from "./Button";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";
import { AUTH_URL } from "../API/config";
import { fetchUpdateProposal, fetchGetProposalbyId } from "../API/calls";
import getProposalReport from "../templates/getProposalReport.js";

const breatheAnimation = keyframes`
 0% { opacity: 0; transform: scale(0.25) translateY(75px); }
 100% { opacity: 1; transform: scale(1); }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
  &-content {
    border-radius: 10px;
    background-color: #e5e5e5;
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
  &-arrow {
    color: #e5e5e5;
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
`;

const Table = ({
  theads = [],
  tdata = [],
  tkeys = [],
  className = "",
  tratio = "",
  url = "",
  handleUpdate,
  download = false,
  approval = false,
  clubs = []
}) => {

  const { refreshPage } = useContext(RefreshContext);

  const handleDownload = async (id) => {
    toast.promise(fetchGetProposalbyId(id)
      .then((res) => {
        console.log(res.data);
        html2pdf()
          .from(getProposalReport(res.data))
          .set({
            margin: 0.2,
            filename: `Proposal-${res.data.eventName}.pdf`,
            image: { type: "jpeg", quality: 0.2 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          })
          .save();
      }), {
      loading: "Downloading...",
      success: "Downloaded Successfully",
      error: (err) => `Error: ${err.message}`,
    });
  };

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

  const ApproveButton = async (id) => {
    const postBody = {
      status: "approved"
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

  const handleDelete = (item) => {
    if (url === AUTH_URL && (item.rights === "admin" || item.rights === "developer")) {
      toast.error("Cannot delete admin or developer");
      return;
    } else {
      axios
        .delete(`${url}/delete/${item._id}`)
        .then((res) => {
          console.log(res);
          toast.success("Delete Successful");
          refreshPage();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Delete Unsuccessful");
        });
    }
  };

  const nodes = tdata.map((d, di) => {
    console.log(d);
    let j = Object();
    j["ID"] = di + 1;
    j["_id"] = d["_id"];
    tkeys.forEach((k) => {
      j[k] = d[k];
    });
    return j;
  });

  let COLUMNS = theads.map((h, idx) => {
    return {
      label: h,
      renderCell: (item) => {
        console.log("ITEM: ", item);

        // Club Check
        const club = clubs.filter(
          (club) => club.clubId === item[tkeys[idx]]
        );

        if (club.length > 0) {
          return club[0].clubName;
        }

        // Year Check
        else if (/^(\d{4})-(12)-(31)T(18):(30):(00).(000)(Z)/.test(item[tkeys[idx]])) {
          return parseInt(item[tkeys[idx]].split("-")[0]) + 1;
        }

        // Date Check
        else if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(item[tkeys[idx]])) {
          return item[tkeys[idx]].split("T")[0].split("-").reverse().join("-");
        }

        // Status Check
        else if (
          item[tkeys[idx]] === "approved" || item[tkeys[idx]] === "rejected" || item[tkeys[idx]] === "pending" || item[tkeys[idx]] === "published"
        ) {
          return (
            <div className="flex space-x-2 items-center">
              <div
                className={`${item[tkeys[idx]] === "approved"
                  ? "bg-[#2bb673] text-[#eaeaea]"
                  : item[tkeys[idx]] === "rejected"
                    ? "bg-[#ff0033] text-[#eaeaea]"
                    : item[tkeys[idx]] === "published"
                      ? "bg-[#ace5ee] text-[#0f52ba]"
                      : "bg-[#ffd000] text-[#303030]"
                  } rounded-full w-8 h-8 flex text-xl justify-center items-center`}
              >
                {item[tkeys[idx]] === "approved" && (<BsCheck2Circle />)}
                {item[tkeys[idx]] === "rejected" && (<FaRegTimesCircle />)}
                {item[tkeys[idx]] === "pending" && (<IoMdTime />)}
                {item[tkeys[idx]] === "published" && (<BsCloudArrowUpFill />)}
              </div>
              <p>{item[tkeys[idx]][0].toUpperCase() + item[tkeys[idx]].slice(1)}</p>
            </div>
          );
        }

        // Image Check
        else if (
          /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$/.test(
            item[tkeys[idx]]
          )
        ) {
          return (
            <div className="flex space-x-2">
              <ModalImage
                className="w-12 h-12 rounded-full"
                small={item[tkeys[idx]]}
                large={item[tkeys[idx]]}
                alt="Image URL"
              />
            </div>
          );
        }

        else return item[tkeys[idx]];
      },
      // resize: true,
    };
  });
  // console.log("ites"+item[tkeys[idx]])

  COLUMNS = [
    { label: "S.No.", renderCell: (item) => item["ID"] },
    ...COLUMNS,
  ];

  if (approval) {
    COLUMNS = [
      ...COLUMNS,
      {
        label: "Approve / Reject",
        renderCell: (item) => {
          return (
            <div className="flex space-x-4 items-center">
              <button
                className="bg-[#1f1fdf] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                onClick={() => { handleDownload(item._id); }}
              >
                <IoMdDownload />
              </button>
              <button
                className="bg-[#2bb673] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                onClick={() => ApproveButton(item._id)}
              >
                <BsCheck2Circle />
              </button>
              <button
                className="bg-[#ff0033] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                onClick={() => RejectButton(item._id)}
              >
                <FaRegTimesCircle />
              </button>
            </div>
          )
        },
      },
    ];
  } else {
    COLUMNS = [
      ...COLUMNS,
      {
        label: "Actions",
        renderCell: (item) => {
          console.log(item._id);
          return (
            <div className="flex space-x-4">
              {
                download ? (
                  <div className="flex space-x-4">
                    <button
                      className="hover:text-[#1f1fdf]"
                      onClick={() => { handleDownload(item._id); }}
                    >
                      <IoMdDownload />
                    </button>
                    <button
                      className="hover:text-[#494998]"
                      onClick={() => UndoButton(item._id)}
                    >
                      <BiUndo />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <StyledPopup
                      trigger={
                        <button className="hover:text-[#ff0000]">
                          <HiOutlineTrash />
                        </button>
                      }
                      position="top center"
                      offsetX={-90}
                      offsetY={64}
                    >
                      {(close) => (
                        <div className="flex items-center space-x-4 m-4">
                          <Button className="w-3/4" text="Cancel" handleClick={close} />
                          <Button
                            className="w-3/4"
                            text="Confirm"
                            handleClick={(e) => {
                              console.log("Delete");
                              handleDelete(item);
                              close();
                            }}
                          />
                        </div>
                      )}
                    </StyledPopup>

                    <button
                      className="hover:text-[#494998]"
                      onClick={(e) => {
                        console.log("HEY");
                        handleUpdate(item._id);
                      }}
                    >
                      <BsPencil />
                    </button>
                  </div>
                )
              }
            </div>
          );
        },
      },
    ];
  }

  const getDefaults = () => {
    let defaultRatio = "";
    theads.forEach((h, idx) => {
      defaultRatio += `${100 / (theads.length + 1)}% `;
    });
    return defaultRatio;
  };

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: 75px ${tratio.length <= 0 ? getDefaults() : tratio} ${approval ? "175px" : "100px"} ;`,
    },
  ]);

  const data = { nodes };

  useEffect(() => {
    console.log("JSON", nodes, COLUMNS, getDefaults(), tratio);
  }, [nodes]);

  return (
    <div className={`${className}`}>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{
          custom: true,
          isDiv: true,
          fixedHeader: true,
          horizontalScroll: false,
        }}
      />
      <div className="flex justify-end space-x-4 mt-8">
        <p>Total Count : {nodes.length}</p>
      </div>
    </div>
  );
};

export default Table;
