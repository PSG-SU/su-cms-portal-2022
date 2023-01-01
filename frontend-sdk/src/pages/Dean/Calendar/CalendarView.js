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

const CalendarView = () => {
  let events = [];
  
  useEffect(() => {
    axios
      .get(`${PROPOSAL_URL}/`)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((proposal) => {
          events.push({
            title: proposal.eventName,
            start: proposal.startDate.slice(0, -5) + "+00:00",
            end: proposal.endDate.slice(0, -5) + "+00:00",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Approved Proposals</Heading>
      <div className="mt-8 lg:pr-[30%] items-center w-full ">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          handleClick={() => {
            console.log(events);
          }}
        />
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]} 
          events={events}
        />
      </div>
    </section>
  );
};

export default CalendarView;
