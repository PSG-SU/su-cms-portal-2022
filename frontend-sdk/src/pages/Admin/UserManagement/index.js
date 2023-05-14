import React, { createContext, useState } from "react";
import ViewUsers from "./ViewUsers";
import AddUsers from "./AddUsers";
import { AUTH_URL } from "../../../API/config.js";
import axios from "axios";
import toast from "react-hot-toast";

export const UserManagementTabContext = createContext();

const UserManagement = () => {
  const initialTabMenuItems = [
    {
      text: "Add Users",
      tab: <AddUsers />,
    },
    {
      text: "View Users",
      tab: <ViewUsers />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [updateState, setUpdateState] = useState({});
  const [tabMenuItems, setTabMenuItems] = useState(initialTabMenuItems);

  const updateByID = (id) => {
    axios
      .get(`${AUTH_URL}/unique/${id}`)
      .then((res) => {
        setUpdateState(res.data);
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Update User";
        setTabMenuItems(tempTabMenuItems);
      })
      .catch((err) => {
        setUpdateState({});
        toast("Error Updating");
        console.log(err);
      });
    setSelected(0);
  };

  return (
    <UserManagementTabContext.Provider
      value={{ selectedTab: selected, updateByID, updateState }}
    >
      <section className="">
        <div className="h-fit bg-gray px-8 pt-8">
          <p className="text-lg uppercase tracking-widest mb-8">USER MANAGEMENT</p>
          <header className="flex">
            {tabMenuItems.map((item, idx) => {
              return (
                <button
                  onClick={() => setSelected(idx)}
                  style={
                    selected === idx
                      ? {
                        WebkitBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        MozBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        boxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        clipPath: "polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%)",
                      }
                      : {}
                  }
                  className={`${selected === idx &&
                    "bg-white rounded-t-lg box-border  font-semibold"
                    } px-6 py-4`}
                >
                  <p className="">{item.text}</p>
                </button>
              );
            })}
          </header>
        </div>
        {tabMenuItems[selected].tab}
      </section>
    </UserManagementTabContext.Provider>
  );
};

export default UserManagement;
