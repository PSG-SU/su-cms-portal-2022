/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import axios from "axios";
import { RefreshContext } from "../../../Refresher";
import { UserManagementTabContext } from ".";
import { AUTH_URL, CLUB_URL } from "../../../API/config";

const ViewUsers = () => {
  const [data, setData] = useState([]);
  const [clubs, setClubs] = useState([]);
  const { refreshToken } = useContext(RefreshContext);
  const url = AUTH_URL;

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, url]);

  const { updateByID } = useContext(UserManagementTabContext);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Users</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
        <Table
          theads={["User ID", "Password", "Club / Association Name", "Rights"]}
          tdata={data}
          tkeys={["userId", "password", "caID", "rights"]}
          className={`${data.length < 20
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          tratio="1fr 1fr 1fr 0.5fr"
          url={url}
          handleUpdate={(id) => updateByID(id)}
          clubs={clubs}
        />
      </div>
    </section>
  );
};

export default ViewUsers;
