/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchGetAllEventReports } from "../../../API/calls";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";
import { REPORT_URL } from "../../../API/config";
import { ReportTabContext } from ".";

const ViewReport = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);

  useEffect(() => {
    fetchGetAllEventReports().then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err);
      toast.error(`Error: ${err}`);
    });
  }, [refreshToken]);

  const { updateByID } = useContext(ReportTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Reports</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
        <Table
          theads={["Event", "Date and Time", "Venue", "Report", "Image"]}
          tdata={data}
          tkeys={["eventName", "dateTime", "venue", "report", "coverImage"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 1fr 0.5fr 1fr 0.5fr"
          url={REPORT_URL}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default ViewReport;