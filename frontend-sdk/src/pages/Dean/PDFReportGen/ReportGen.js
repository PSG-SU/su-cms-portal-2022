import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CLUB_URL, REPORT_URL } from "../../../API/config";
import { fetchGetAllDateRangeEventReports, fetchGetDateRangeEventReports } from "../../../API/calls";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import DateInput from "../../../components/DateInput";
import Table from "../../../components/Table";
import Dropdown from "../../../components/Dropdown";
import consolidatedEventReport from "../../../templates/consolidatedEventReport";
import { RefreshContext } from "../../../Refresher";
import { IoCloseOutline } from "react-icons/io5";

const ReportGen = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [cid, setCid] = useState("");
  const [username, setUsername] = useState("");
  const { refreshPage, refreshToken } = useContext(RefreshContext);

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (username) {
      setCid(clubs.filter((club) => club.clubName === username)[0].clubId);
    }
  }, [clubs, username]);

  useEffect(() => {
    if (cid) {
      if (startDate === "" || endDate === "") {
        return toast.error("Please fill in the dates");
      }

      const postBody = {
        startDate: startDate,
        endDate: endDate,
      };

      toast.promise(fetchGetDateRangeEventReports(postBody, cid), {
        loading: "Filtering Data...",
        success: (res) => {
          if (res.data.length === 0) {
            // setData(null);
            return "No data found";
          }

          setData(res.data.sort((a, b) => (new Date(a.startDate) - new Date(b.startDate))));
          return "Filtered";
        },
        error: (err) => {
          return `Error: ${err.response.data.error}`;
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, refreshToken]);

  const clearUsername = () => {
    setUsername("");
    setCid("");
    handleFetch();
    refreshPage();
  };

  const handleFetch = () => {
    if (startDate === "" || endDate === "") {
      return toast.error("Please fill in the dates");
    }

    const postBody = {
      startDate: startDate,
      endDate: endDate,
    };

    toast.promise(fetchGetAllDateRangeEventReports(postBody), {
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
    toast.promise(consolidatedEventReport(data, view), {
      loading: view ? "Loading" : "Downloading...",
      success: view ? "Loaded" : `Downloaded`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Generate Report</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-16.5rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 lg:pr-[15%]">
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
          <Button className="w-1/3" text="Fetch Reports" handleClick={handleFetch} />
          {data && (
            <React.Fragment>
              <Button className="w-1/3 bg-[#452492] text-[#eaeaea]" text="View Consolidated Report" handleClick={handleDownload(true)} />
              <Button className="w-1/3 bg-[#21218d] text-[#eaeaea]" text="Download Consolidated Report" handleClick={handleDownload(false)} />
            </React.Fragment>
          )}
        </div>

        {data && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-4 items-center">
              <Dropdown
                valueState={[username, setUsername]}
                title="Club / Association Name"
                placeholder="Filter a Club / Association"
                options={clubs.map((club) => club.clubName)}
                className="w-1/2 mt-10 z-10"
              />
              {username && (
                <button
                  className="rounded-full mt-16 bg-[#E5E5E5] p-1 hover:bg-cloud hover:text-white z-40"
                  onClick={clearUsername}
                >
                  <IoCloseOutline />
                </button>
              )}
            </div>

            <div className="w-full">
              <Table
                theads={["Event", "Club", "Start Date", "Image"]}
                tdata={data}
                tkeys={["eventName", "user", "startDate", "coverImage"]}
                className={`${data.length < 8
                  ? "max-h-[calc(100vh-20rem)]"
                  : "h-[calc(100vh-25rem)]"
                  } w-full`}
                tratio="1fr 0.5fr 1fr 0.5fr"
                url={REPORT_URL}
                clubs={clubs}
                showDownload
                eventReportPage
                smallTable
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
