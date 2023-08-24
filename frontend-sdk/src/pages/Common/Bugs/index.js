import axios from "axios";
import React, { createContext, useState } from "react";
import AddBugs from "./AddBugs";
import ViewBugs from "./ViewBugs";
import { BUGS_URL } from "../../../API/config.js";
import { toast } from "react-hot-toast";

export const BugsTabContext = createContext();

const Bugs = () => {
  const initialTabMenuItems = [
    {
      text: "Report Bugs / Feature Requests",
      tab: <AddBugs />,
    },
    {
      text: "View Status",
      tab: <ViewBugs />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [updateState, setUpdateState] = useState({});
  const [tabMenuItems, setTabMenuItems] = useState(initialTabMenuItems);

  const username = localStorage.getItem("userId");

  const updateByID = (id) => {
    axios
      .get(`${BUGS_URL}/${id}`)
      .then((res) => {

        if (res.data.user !== username) {
          return toast.error("Cannot update other user's item");
        }

        setUpdateState(res.data);
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Update Bug / Feature Request";
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
    <BugsTabContext.Provider
      value={{ selectedTab: selected, updateByID, updateState }}
    >
      <section className="">
        <div className="h-fit bg-gray px-8 pt-8">
          <p className="text-lg uppercase tracking-wider mb-8">
            ISSUES / BUGS / FEATURE REQUESTS / SUGGESTIONS
          </p>
          <header className="flex">
            {tabMenuItems.map((item, idx) => {
              return (
                <button
                  onClick={() => setSelected(idx)}
                  key={idx}
                  style={
                    selected === idx
                      ? {
                        WebkitBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        MozBoxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        boxShadow: "2px -2px 25px 0px rgba(0,0,0,0.2)",
                        clipPath:
                          "polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%)",
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
    </BugsTabContext.Provider>
  );
};

export default Bugs;
