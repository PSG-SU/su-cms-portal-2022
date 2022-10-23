import axios from "axios";
import React, { createContext, useState } from "react";
import AddMembers from "./AddMembers";
import ViewMembers from "./ViewMembers";
import { OFFICE_BEARERS_URL } from "../../../API/config.js";
import { toast } from "react-hot-toast";

export const OfficeBearersTabContext = createContext();

const OfficeBearers = () => {
  const TabMenuItems = [
    {
      text: "Add Members",
      tab: <AddMembers />,
      // link: "/officebearers/add",
    },
    {
      text: "View Members",
      tab: <ViewMembers />,
      // link: "/officebearers/view",
    },
  ];

  const [selected, setSelected] = useState(0);

  const [updateState, setUpdateState] = useState({});

  const [tabMenuItems, setTabMenuItems] = useState(TabMenuItems);

  const updateByID = (id) => {
    axios
      .get(`${OFFICE_BEARERS_URL}/${id}`)
      .then((res) => {
        setUpdateState(res.data);
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Update Member";
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
    <OfficeBearersTabContext.Provider
      value={{ selectedTab: selected, updateByID, updateState }}
    >
      <section className="">
        <div className="h-fit bg-gray px-8 pt-8">
          <p className="text-lg uppercase tracking-wider mb-8">
            OFFICE BEARERS
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
                  className={`${
                    selected === idx &&
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
    </OfficeBearersTabContext.Provider>
  );
};

export default OfficeBearers;
