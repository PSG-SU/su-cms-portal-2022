/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

import Heading from "../../../components/Heading";
import axios from "axios";
import { CalendarContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { CLUB_URL, PROPOSAL_URL } from "../../../API/config";
import Button from "../../../components/Button";
import { toast } from "react-hot-toast";
import { fetchGetProposalbyId } from "../../../API/calls";
import html2pdf from "html2pdf.js";
import getProposalReport from "../../../templates/getProposalReport";
import { IoMdDownload } from "react-icons/io";

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`${PROPOSAL_URL}/`)
      .then((res) => {
        console.log(res.data);
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
  }, []);

  const handleDownload = async (id) => {
    toast.promise(
      fetchGetProposalbyId(id).then((res) => {
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
      }),
      {
        loading: "Downloading...",
        success: "Downloaded Successfully",
        error: (err) => `Error: ${err.message}`,
      }
    );
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Approved Proposals</Heading>
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
              <p className="text-lg text-center bg-[#f5f5f5] p-6 text-opacity-50 font-semibold">
                No Event Selected
              </p>
            ) : (
              <div className="w-full">
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
                  <div className="">
                    <p className="text-xs font-semibold">Under</p>
                    <p className="text-sm">
                      {currentEvent.event.extendedProps.facultyName},
                    </p>
                    <p className="text-xs">
                      {currentEvent.event.extendedProps.facultyDept}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4 items-start space-x-6">
                  <button
                    className="text-lg hover:opacity-60"
                    onClick={() =>
                      handleDownload(currentEvent.event.extendedProps._id)
                    }
                  >
                    <IoMdDownload />
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
