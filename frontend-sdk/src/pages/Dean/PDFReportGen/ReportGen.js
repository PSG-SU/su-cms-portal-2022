import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { REPORT_URL } from "../../../API/config";
import { fetchGetAllDateRangeEventReports } from "../../../API/calls";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import DateInput from "../../../components/DateInput";
import Table from "../../../components/Table";
import consolidatedEventReport from "../../../templates/consolidatedEventReport";

const ReportGen = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);

  const handleClick = () => {
    if (startDate === "" || endDate === "") {
      toast.error("Please fill in the dates");
      return;
    }

    const postBody = {
      startDate: startDate,
      endDate: endDate,
    };

    toast.promise(fetchGetAllDateRangeEventReports(postBody), {
      loading: "Gathering Data...",
      success: (res) => {
        if (res.data.length === 0) {
          setData(null);
          return "No data found";
        }
        
        setData(res.data.sort((a, b) => (new Date(a.startDate) - new Date(b.startDate))));
        return "Gathered";
      },
      error: (err) => {
        return `Error: ${err.response.data.error}`;
      },
    });
  };

  const handleDownload = (view) => () => {
    toast.promise(consolidatedEventReport(data, view), {
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
          <DateInput
            startTitle="Start Date"
            startState={[startDate, setStartDate]}
            endTitle="End Date"
            endState={[endDate, setEndDate]}
            range
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-1/2" text="Fetch Reports" handleClick={handleClick} />
        </div>

        {data && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center space-x-4 mt-8 w-3/4">
              <Button className="w-1/2 bg-[#931674] text-[#eaeaea]" text="View Consolidated Report" handleClick={handleDownload(true)} />
              <Button className="w-1/2 bg-[#121279] text-[#eaeaea]" text="Download Consolidated Report" handleClick={handleDownload(false)} />
            </div>

            <div className="mt-16 w-full">
              <Table
                theads={["Event", "Start Date", "End Date", "Venue", "Count", "Image"]}
                tdata={data}
                tkeys={["eventName", "startDate", "endDate", "venue", "count", "coverImage"]}
                className={`${data.length < 8
                  ? "max-h-[calc(100vh-20rem)]"
                  : "h-[calc(100vh-25rem)]"
                  } w-full`}
                tratio="1fr 1fr 1fr 0.5fr 0.5fr 0.5fr"
                url={REPORT_URL}
                showDownload
                eventReportPage
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
