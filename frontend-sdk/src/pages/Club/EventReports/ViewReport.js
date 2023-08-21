/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchGetEventReportByUser } from "../../../API/calls";
import axios from "axios";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";
import { REPORT_URL, AUTH_URL } from "../../../API/config";
import { ReportTabContext } from ".";

const ViewReport = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  useEffect(() => {
    if (user) {
      fetchGetEventReportByUser(user).then(res => {
        setData(res.data)
      }).catch(err => {
        console.log(err);
        toast.error(`Error: ${err}`);
      });
    }
  }, [refreshToken, user]);

  const { updateByID } = useContext(ReportTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Reports</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
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
          handleUpdate={(id) => updateByID(id)}
          showDownload
          eventReportPage
        />
      </div>
    </section>
  );
};

export default ViewReport;