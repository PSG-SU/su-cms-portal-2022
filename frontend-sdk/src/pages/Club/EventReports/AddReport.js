import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import MultipleFiles from "../../../components/MultipleFiles";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { fetchAddEventReport, fetchGetEventReportByName, fetchUpdateEventReport, fetchUploadFile } from "../../../API/calls";
import toast from "react-hot-toast";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import { AUTH_URL, PROPOSAL_URL } from "../../../API/config";
import DateInput from "../../../components/DateInput";
import TextArea from "../../../components/TextArea";
import { ReportTabContext } from ".";

const AddReport = () => {
  const { updateState, updateByID } = useContext(ReportTabContext);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [eventName, setEventName] = useState("");
  const [allEventNames, setAllEventNames] = useState([]);
  const [allEvents, setAllEvents] = useState({});
  const [startDate, setStartDate] = useState("");
  const [venue, setVenue] = useState("");
  const [participants, setParticipants] = useState("");
  const [report, setReport] = useState("");
  const [user, setUser] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    if (Object.keys(updateState).length > 0) {
      setEventName(updateState?.eventName);
      setFileUrls(updateState?.images);
      setStartDate(new Date(updateState?.dateTime));
      setVenue(updateState?.venue);
      setParticipants(updateState?.count);
      setReport(updateState?.report);
      setID(updateState?._id);
    }
  }, [updateState]);

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    axios.get(`${PROPOSAL_URL}/published/${user}`, {})
      .then((res) => {
        setAllEvents(res.data);

        res.data.forEach((event) => {
          console.log(event.eventName);
          setAllEventNames(allEvents => [event.eventName, ...allEvents]);
        });
      })
  }, [user])

  useEffect(() => {
    if (eventName) {
      fetchGetEventReportByName({ eventName: eventName }).then((res) => {
        if (res.data.length > 0) {
          updateByID(res.data[0]._id);
          return;
        }
      })

      if (allEvents?.length > 0) {
        const e = allEvents?.filter((event) => event.eventName === eventName)[0];
        setStartDate(new Date(e?.startDate));
        setVenue(e?.venue);
        setParticipants(e?.count);
        setReport("");
        setFileUrls([]);
        updateByID(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, allEvents])

  const handleSingleUpload = (files, curr_no, total) => {
    if (files.length <= 0) {
      if (Object.keys(updateState).length > 0) {
        toast.promise(fetchUpdateEventReport({
          images: fileUrls,
          eventName: eventName,
          dateTime: startDate,
          venue: venue,
          count: participants,
          report: report,
        }, ID), {
          loading: `Updating...`,
          success: (res) => {
            console.log(res);
            window.location.reload();
            return "Update completed";
          },
          error: "Error updating",
        });
        return;
      }

      toast.promise(fetchAddEventReport({
        images: fileUrls,
        eventName: eventName,
        dateTime: startDate,
        venue: venue,
        count: participants,
        report: report,
        user: user,
      }), {
        loading: `Uploading...`,
        success: (res) => {
          console.log(res);
          window.location.reload();
          return "Upload completed";
        },
        error: (res) => {
          console.log(res);
          return "Error Occured";
        },
      });
      return;
    }
    const currentFile = files.pop();
    toast.promise(fetchUploadFile(currentFile), {
      loading: `Uploading... ${curr_no}/${total}`,
      success: (res) => {
        let tempFileUrls = fileUrls;
        tempFileUrls.push(res.data.url);
        setFileUrls(tempFileUrls);
        handleSingleUpload(files, curr_no + 1, total);
        return `Uploaded ${curr_no}/${total}`;
      },
      error: "Error Occured",
    });
  };

  const handleUpload = () => {
    if (eventName.length <= 0) return toast.error("Chooose an event");
    if (isNaN(participants)) return toast.error("Enter a valid number of participants");

    if (Object.keys(updateState).length > 0) {
      if (files.length <= 0 && fileUrls.length <= 0) return toast.error("Files required for upload.");

      toast.promise(fetchUpdateEventReport({
        images: fileUrls,
        eventName: eventName,
        dateTime: startDate,
        venue: venue,
        count: participants,
        report: report,
      }, ID), {
        loading: `Updating...`,
        success: (res) => {
          console.log(res);
          window.location.reload();
          return "Update completed";
        },
        error: "Error updating",
      });
      return;
    }

    if (files.length <= 0) return toast.error("Files required for upload.");
    handleSingleUpload(files.reverse(), 1, files.length);
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>{Object.keys(updateState).length <= 0 ? "Add" : "Update"} Report</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <p>
            The first uploaded image will be on the top during display in the
            gallery page.<br></br>
            Only .jpg/.png files are supported.<br></br>
          </p>
        </div>
        <div className="flex items-center w-1/2 space-x-4 mt-4">
          <Dropdown
            valueState={[eventName, setEventName]}
            title="Event Name"
            placeholder="Choose an event"
            options={allEventNames}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <DateInput
            startTitle="Date and Time"
            startState={[startDate, setStartDate]}
          />
          <Inputfield
            title="Venue"
            valueState={[venue, setVenue]}
          />
          <Inputfield
            title="No. of Participants"
            valueState={[participants, setParticipants]}
          />
        </div>
        <TextArea
          title="Report"
          className="mt-4"
          valueState={[report, setReport]}
        />
        <div className="flex items-center w-full space-x-4 mt-4">
          <MultipleFiles
            title="Images to be uploaded"
            className="w-3/4"
            fileState={[files, setFiles]}
            urlState={[fileUrls, setFileUrls]}
          />
        </div>
        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text={Object.keys(updateState).length > 0 ? "Update" : "Upload"} handleClick={handleUpload} />
          {Object.keys(updateState).length > 0 && (
            <Button
              className="w-3/4"
              text="Cancel"
              handleClick={handleCancel}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AddReport;
