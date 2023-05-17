/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { TeamMemberContext } from ".";
import { RefreshContext } from "../../../Refresher";
import { TEAM_MEMBER_URL, AUTH_URL } from "../../../API/config";

const EditandDelete = () => {
  const [data, setData] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = TEAM_MEMBER_URL;
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
      axios
        .get(`${url}/user/${user}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshToken, user]);

  const { updateByID } = useContext(TeamMemberContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Team View</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
        <Table
          theads={["Name", "Position", "Department", "Designation", "Phone", "Email", "From", "To", "Image"]}
          tdata={data}
          tkeys={["name", "position", "department", "designation", "phone", "email", "from", "to", "image_url"]}
          className={`${data.length < 8
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
