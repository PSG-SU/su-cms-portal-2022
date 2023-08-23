import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AUTH_URL, REPORT_URL } from "../../../API/config";
import { fetchGetDateRangeEventReports, fetchGetDateRangeProposals } from "../../../API/calls";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import DateInput from "../../../components/DateInput";
import Table from "../../../components/Table";
import Dropdown from "../../../components/Dropdown";
import consolidatedEventReport from "../../../templates/consolidatedEventReport";

const ReportGen = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState("");
  const [data, setData] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  const handleFetch = () => {
    if (startDate === "" || endDate === "") {
      return toast.error("Please fill in the dates");
    }

    const postBody = {
      startDate: startDate,
      endDate: endDate,
    };

    toast.promise(type === "Event Reports" ? fetchGetDateRangeEventReports(postBody, user) : fetchGetDateRangeProposals(postBody, user), {
      loading: "Fetching Data...",
      success: (res) => {
        if (res.data.length === 0) {
          setData(null);
          return "No data found";
        }

        setData(res.data.sort((a, b) => (new Date(a.startDate) - new Date(b.startDate))));
        return "Fetched";
      },
      error: (err) => {
        return `Error: ${err.response.data.error}`;
      },
    });
  };

  const handleDownload = (view) => () => {
    toast.promise(consolidatedEventReport(data, type === "Event Proposals", view), {
      loading: view ? "Loading" : "Downloading...",
      success: view ? "Loaded" : `Downloaded`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Generate Report</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 lg:pr-[15%]">
          <Dropdown
            title="Type"
            options={["Event Reports", "Event Proposals"]}
            valueState={[type, setType]}
            className="w-1/2"
          />
          <DateInput
            startTitle="Start Date"
            startState={[startDate, setStartDate]}
            endTitle="End Date"
            endState={[endDate, setEndDate]}
            range
            className="z-20 w-full"
          />
        </div>

        <div className="flex items-center space-x-4 mt-4 w-full">
          <Button className="w-1/3" text={`Fetch ${type === "Event Reports" ? "Reports" : "Proposals"}`} handleClick={handleFetch} />
          {data && (
            <React.Fragment>
              <Button className="w-1/3 bg-[#452492] text-[#eaeaea]" text="View Consolidated Report" handleClick={handleDownload(true)} />
              <Button className="w-1/3 bg-[#21218d] text-[#eaeaea]" text="Download Consolidated Report" handleClick={handleDownload(false)} />
            </React.Fragment>
          )}
        </div>

        {data && (
          <div className="flex flex-col gap-4 w-full">
            <div className="mt-24 w-full">
              <Table
                theads={["Event", "Start Date", "End Date", "Venue", "Count"]}
                tdata={data}
                tkeys={["eventName", "startDate", "endDate", "venue", "count"]}
                className={`${data.length < 8
                  ? "max-h-[calc(100vh-20rem)]"
                  : "h-[calc(100vh-25rem)]"
                  } w-full`}
                tratio="1fr 1fr 1fr 0.5fr 0.5fr"
                url={REPORT_URL}
                showDownload
                smallTable
                eventReportPage={type === "Event Reports"}
                hideUpdate
                hideDelete
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ReportGen;
