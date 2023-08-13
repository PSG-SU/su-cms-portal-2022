import React, { createContext, useState } from "react";
import AddReport from "./AddReport";
import ViewReport from "./ViewReport";
import { REPORT_URL } from "../../../API/config";
import toast from "react-hot-toast";
import axios from "axios";

export const ReportTabContext = createContext();

const EventReport = () => {
  const initialTabMenuItems = [
    {
      text: "Add Report",
      tab: <AddReport />,
    },
    {
      text: "View Reports",
      tab: <ViewReport />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [updateState, setUpdateState] = useState({});
  const [tabMenuItems, setTabMenuItems] = useState(initialTabMenuItems);

  const updateByID = (id) => {
    axios
      .get(`${REPORT_URL}/${id}`)
      .then((res) => {
        setUpdateState(res.data);
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Update Report";
        setTabMenuItems(tempTabMenuItems);
      })
      .catch((err) => {
        setUpdateState({});
        let tempTabMenuItems = [...tabMenuItems];
        tabMenuItems[0].text = "Add Report";
        setTabMenuItems(tempTabMenuItems);
        if (id !== 0) {
          toast("Error Updating");
        }
        console.log(err);
      });
    setSelected(0);
  };

  return (
    <ReportTabContext.Provider
      value={{ selectedTab: selected, updateByID, updateState }}
    >
      <section className="">
        <div className="h-fit bg-gray px-8 pt-8">
          <p className="text-lg uppercase tracking-wider mb-8">EVENT REPORTS</p>
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
    </ReportTabContext.Provider>
  );
};

export default EventReport;