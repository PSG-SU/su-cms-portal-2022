import React, { useContext, useEffect, useState } from "react";
import { BsPencil, BsCloudArrowUpFill, BsCheck2, BsCheck2All, BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { BiSortAlt2, BiUndo } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdDownload, IoMdEye, IoMdTime } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import ModalImage from "react-modal-image";
import axios from "axios";
import { toast } from "react-hot-toast";

import { RefreshContext } from "../Refresher";
import Button from "./Button";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";
import { CLUB_URL } from "../API/config";
import { fetchGetEventReportById, fetchGetProposalbyId } from "../API/calls";
import Inputfield from "./TextInput";
import reportWithAttachments from "../templates/reportWithAttachments";
import eventReportWithAttachments from "../templates/eventReportWithAttachments";

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
  UndoButton = null,
  ApproveButton = null,
  RejectButton = null,
  clubs = [],
  hideUpdate = false,
  hideDelete = false,
  showDownload = false,
  eventReportPage = false,
  smallTable = false,
}) => {

  const { refreshPage } = useContext(RefreshContext);

  const handleDownload = async (id, view = false) => {
    if (eventReportPage) {
      toast.promise(fetchGetEventReportById(id), {
        loading: "Generating PDF...",
        success: (res) => {
          let clubName = "";
          axios.get(`${CLUB_URL}/id/${res.data.user}`)
            .then((r) => {
              clubName = r.data.clubName;
              toast.promise(eventReportWithAttachments(res.data, clubName, view), {
                loading: view ? "Loading" : "Downloading...",
                success: view ? "Loaded" : `Downloaded ${res.data.eventName}`,
                error: (err) => `Error: ${err.message}`,
              });
            });
          return `PDF Generated`;
        },
        error: (err) => `Error: ${err.message}`,
      });
    } else {
      toast.promise(fetchGetProposalbyId(id), {
        loading: "Generating PDF...",
        success: (res) => {
          let clubName = "";
          axios.get(`${CLUB_URL}/id/${res.data.user}`)
            .then((r) => {
              clubName = r.data.clubName;
              toast.promise(reportWithAttachments(res.data, clubName, view), {
                loading: view ? "Loading" : "Downloading...",
                success: view ? "Loaded" : `Downloaded ${res.data.eventName}`,
                error: (err) => `Error: ${err.message}`,
              });
            });
          return `PDF Generated`;
        },
        error: (err) => `Error: ${err.message}`,
      });
    }
  };

  const handleDelete = (item) => {
    axios
      .delete(`${url}/delete/${item._id}`, {
        data: {
          login: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        toast.success("Delete Successful");
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete Unsuccessful");
      });
  };

  const nodes = tdata.map((d, di) => {
    let j = Object();
    j["ID"] = di + 1;
    j["_id"] = d["_id"];
    tkeys.forEach((k) => {
      j[k] = d[k];
    });
    return j;
  });

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [order, setOrder] = useState("asc");

  let COLUMNS = theads.map((h, idx) => {
    return {
      label: (h !== "Image") ? (<button
        className="flex items-center hover:text-[#3a3ab7]"
        onClick={() => {
          sortKey === tkeys[idx] ? setOrder(order === "asc" ? "desc" : "asc") : setOrder("asc");
          setSortKey(order === "desc" ? "ID" : tkeys[idx]);
        }}
      >
        {h} {sortKey === tkeys[idx] ? (order === "asc" ? <BsSortUpAlt className="ml-1" /> : <BsSortDown className="ml-1" />) : <BiSortAlt2 className="ml-1" />}
      </button>) : h,

      renderCell: (item) => {

        // Club Check
        const club = clubs.filter(
          (club) => club.clubId === item[tkeys[idx]]
        );

        if (h !== "Password" && club.length > 0) {
          return club[0].clubName;
        }

        // Year Check
        else if (/^(\d{4})-(12)-(31)T(18):(30):(00).(000)(Z)/.test(item[tkeys[idx]])) {
          return new Date(item[tkeys[idx]]).getFullYear();
        }

        // Date Check
        else if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(item[tkeys[idx]])) {

          const date = new Date(item[tkeys[idx]]);

          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const timeFormat = (dateTime) => {
            return `${(dateTime.getHours() < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) <= 12 ?
              dateTime.getHours() :
              ((parseInt(dateTime.getHours().toString()) - 12 < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) - 12)))}:${(dateTime.getMinutes() < 10 && '0') + dateTime.getMinutes()}
          ${dateTime.getHours() < 12 ? " AM" : " PM"}`
          }

          return `${(date.getDate() < 10 && '0') + date.getDate()} ${monthNames[date.getMonth()]} '${date.getFullYear().toString().slice(-2)}, ${timeFormat(date)}`;
        }

        // Status Check
        else if (
          item[tkeys[idx]] === "facApproved" || item[tkeys[idx]] === "deanApproved" || item[tkeys[idx]] === "rejected" || item[tkeys[idx]] === "pending" || item[tkeys[idx]] === "published" || item[tkeys[idx]] === "approvalVerification"
        ) {
          return (
            <div className="flex space-x-2 items-center">
              <div
                className={`${(item[tkeys[idx]] === "facApproved" || item[tkeys[idx]] === "deanApproved")
                  ? "bg-[#2bb673] text-[#eaeaea]"
                  : item[tkeys[idx]] === "rejected"
                    ? "bg-[#ff0033] text-[#eaeaea]"
                    : item[tkeys[idx]] === "published"
                      ? "bg-[#ace5ee] text-[#0f52ba]"
                      : "bg-[#ffd000] text-[#303030]"
                  } rounded-full w-8 h-8 flex text-xl justify-center items-center`}
              >
                {item[tkeys[idx]] === "facApproved" && (<BsCheck2 />)}
                {item[tkeys[idx]] === "deanApproved" && (<BsCheck2All />)}
                {item[tkeys[idx]] === "rejected" && (<FaRegTimesCircle />)}
                {item[tkeys[idx]] === "pending" && (<IoMdTime />)}
                {item[tkeys[idx]] === "published" && (<BsCloudArrowUpFill />)}
                {item[tkeys[idx]] === "approvalVerification" && (<IoDocumentTextOutline />)}
              </div>
              <p>
                {item[tkeys[idx]] === "facApproved" && "Approved By Faculty"}
                {item[tkeys[idx]] === "deanApproved" && "Approved By Dean"}
                {item[tkeys[idx]] === "rejected" && "Rejected"}
                {item[tkeys[idx]] === "pending" && "Pending"}
                {item[tkeys[idx]] === "published" && "Published"}
                {item[tkeys[idx]] === "approvalVerification" && "Approval Verification"}
              </p>
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

  COLUMNS = [
    {
      label: <button
        className="flex items-center hover:text-[#3a3ab7]"
        onClick={() => {
          sortKey === "ID" ? setOrder(order === "asc" ? "desc" : "asc") : setOrder("asc");
          setSortKey("ID");
        }}
      >
        No. {sortKey === "ID" ? (order === "asc" ? <BsSortUpAlt className="ml-1" /> : <BsSortDown className="ml-1" />) : <BiSortAlt2 className="ml-1" />}
      </button>, renderCell: (item) => item["ID"]
    },
    ...COLUMNS,
  ];

  if (ApproveButton) {
    COLUMNS = [
      ...COLUMNS,
      {
        label: "Approve / Reject",
        renderCell: (item) => {
          return (
            <div className="flex space-x-4 items-center">
              <button
                className="bg-[#e21ab0] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                onClick={() => { handleDownload(item._id, true); }}
              >
                <IoMdEye />
              </button>
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
                <BsCheck2 />
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
          return (
            <div className="flex space-x-4">
              {
                UndoButton ? (
                  <div className="flex space-x-4">
                    <button
                      className="bg-[#e21ab0] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                      onClick={() => { handleDownload(item._id, true); }}
                    >
                      <IoMdEye />
                    </button>
                    <button
                      className="bg-[#1f1fdf] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                      onClick={() => { handleDownload(item._id); }}
                    >
                      <IoMdDownload />
                    </button>
                    <button
                      className="bg-[#671bd7] text-[#eaeaea] rounded-full w-8 h-8 flex text-xl justify-center items-center"
                      onClick={() => UndoButton(item._id)}
                    >
                      <BiUndo />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    {!hideUpdate &&
                      <button
                        className="hover:text-[#494998]"
                        onClick={(e) => {
                          handleUpdate(item._id);
                        }}
                      >
                        <BsPencil />
                      </button>
                    }
                    {showDownload && (
                      <React.Fragment>
                        <button
                          className="hover:text-[#e21ab0]"
                          onClick={() => { handleDownload(item._id, true); }}
                        >
                          <IoMdEye />
                        </button>
                        <button
                          className="hover:text-[#1f1fdf]"
                          onClick={() => { handleDownload(item._id); }}
                        >
                          <IoMdDownload />
                        </button>
                      </React.Fragment>
                    )}
                    {!hideDelete && <StyledPopup
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
                              handleDelete(item);
                              close();
                            }}
                          />
                        </div>
                      )}
                    </StyledPopup>
                    }
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
      Table: `--data-table-library_grid-template-columns: 75px ${tratio.length <= 0 ? getDefaults() : tratio} ${ApproveButton ? "200px" : "155px"} ;`,
    },
  ]);

  const sortData = (node, key, order) => {
    const sortedData = [...node].sort((a, b) => {
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  }

  const searchNodes = sortData(nodes, sortKey, order).filter((item) => {
    return Object.keys(item).some((key) => {
      let flag = false;
      clubs?.length > 0 && clubs.filter((c) => c.clubName.toLowerCase().includes(search.toLowerCase())).forEach((c) => {
        if (c.clubId === item[key]) flag = true;
      });
      return flag || String(item[key]).toLowerCase().includes(search.toLowerCase());
    });
  })

  const data = { nodes: searchNodes }

  useEffect(() => {
    console.log("JSON", nodes, COLUMNS, getDefaults(), tratio);
  }, [nodes]);

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-end space-x-4 -mt-16 mb-6">
        <Inputfield
          className="w-1/4"
          placeholder="Search"
          valueState={[search, setSearch]}
        />
      </div>
      <div className={`${smallTable ? searchNodes.length < 3 ? "h-min" : "h-[calc(100vh-39rem)]" : `${searchNodes.length < 8 ? "h-min" : "h-[calc(100vh-22rem)]"}` }`}>
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
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <p>Total Count : <b className="font-semibold">{searchNodes.length}</b></p>
      </div>
    </div>
  );
};

export default Table;
