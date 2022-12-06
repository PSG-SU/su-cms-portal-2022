/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { TeamMemberContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { TEAM_MEMBER_URL } from "../../../API/config";

const EditandDelete = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = TEAM_MEMBER_URL;

  useEffect(() => {
    axios
      .get(`${url}/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        setData(res.data);
        console.log(`${TEAM_MEMBER_URL}/${localStorage.getItem("userId")}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  const { updateByID } = useContext(TeamMemberContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Team View</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-auto">
        <Table
          theads={["Name", "Position", "Department", "Designation", "Phone", "Email", "From", "To", "Image"]}
          tdata={data}
          tkeys={["name", "position", "department", "designation", "phone", "email", "from", "to", "image_url"]}
          className={`${
            data.length < 8
              ? "max-h-[calc(100vh-20rem)]"
              : "h-[calc(100vh-20rem)]"
          } w-full`}
          tratio="1fr 1fr 1fr 1fr 1fr 1fr 0.5fr 0.5fr 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
        />
      </div>
    </section>
  );
};

export default EditandDelete;
