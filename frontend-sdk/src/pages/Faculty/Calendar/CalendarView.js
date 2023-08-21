/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Heading from "../../../components/Heading";
import axios from "axios";
import { CLUB_URL, PROPOSAL_URL, AUTH_URL } from "../../../API/config";
import { toast } from "react-hot-toast";
import { fetchGetProposalbyId } from "../../../API/calls";
import { IoMdDownload, IoMdEye } from "react-icons/io";
import reportWithAttachments from "../../../templates/reportWithAttachments";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [cid, setCid] = useState("");

  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setCid(res.data.caID);
      })
  }, []);

  useEffect(() => {
    if (cid) {
      axios
        .get(`${PROPOSAL_URL}/user/${cid}`)
        .then((res) => {
          console.log("Calendar", res.data);
          setEvents(
            res.data.map((proposal) => ({
              ...proposal,
              title: proposal.eventName,
              start: proposal.startDate.slice(0, -5) + "+00:00",
              end: proposal.endDate.slice(0, -5) + "+00:00",
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cid]);

  const handleDownload = async (id, view = false) => {
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
  };

  const statusText = {
    "facApproved": "Approved By Faculty",
    "deanApproved": "Approved By Dean",
    "rejected": "Rejected",
    "pending": "Pending",
    "published": "Published",
    "approvalVerification": "Waiting for Principal Approval Verification",
  }

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Proposals</Heading>
      <div className="mt-8 pr-8 items-center w-full overflow-y-auto h-[calc(100vh-18rem)]">
        <div className="flex space-x-6 ">
          <div className="w-2/3">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              themeSystem="Simplex"
              plugins={[dayGridPlugin]}
              events={events}
              eventClick={(info) => {
                console.log(info);
                setCurrentEvent(info);
              }}
            />
          </div>
          <div className="w-1/3 break-words">
            {!currentEvent ? (
              <p className="text-lg text-center bg-[#f5f5f5] p-6 text-opacity-50 font-semibold rounded-xl">
                No Event Selected
              </p>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <h3 className="text-lg font-semibold">
                  {currentEvent.event.title}
                </h3>
                <div className="flex mt-2 items-start space-x-6">
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">Start</p>
                    <p className="text-sm">
                      {new Date(
                        currentEvent.event.extendedProps.startDate
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">End</p>
                    <p className="text-sm">
                      {new Date(
                        currentEvent.event.extendedProps.endDate
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex mt-2 items-start space-x-6">
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">Venue</p>
                    <p className="text-sm">
                      {currentEvent.event.extendedProps.venue}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">Count</p>
                    <p className="text-sm">
                      {currentEvent.event.extendedProps.count}
                    </p>
                  </div>
                </div>
                <div className="flex mt-2 items-start space-x-6">
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">Faculty Advisor</p>
                    <p className="text-sm">
                      {currentEvent.event.extendedProps.facultyName},
                    </p>
                    <p className="text-xs">
                      {currentEvent.event.extendedProps.facultyDept}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs font-semibold">Status</p>
                    <p className="text-sm">
                      {statusText[currentEvent.event.extendedProps.status]}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 items-start">
                  <p className="text-xs font-semibold w-1/5">Event Proposal</p>
                  <button
                    className="text-lg hover:opacity-60"
                    onClick={() =>
                      handleDownload(currentEvent.event.extendedProps._id)
                    }
                  >
                    <IoMdDownload />
                  </button>
                  <button
                    className="text-lg hover:opacity-60"
                    onClick={() =>
                      handleDownload(currentEvent.event.extendedProps._id, true)
                    }
                  >
                    <IoMdEye />
                  </button>
                </div>
                <div className="flex gap-4 mt-4 items-start">
                  <p className="text-xs font-semibold w-1/5">Event Report</p>
                  <button
                    className="text-lg hover:opacity-60"
                    onClick={() =>
                      handleDownload(currentEvent.event.extendedProps._id)
                    }
                  >
                    <IoMdDownload />
                  </button>
                  <button
                    className="text-lg hover:opacity-60"
                    onClick={() =>
                      handleDownload(currentEvent.event.extendedProps._id, true)
                    }
                  >
                    <IoMdEye />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarView;
