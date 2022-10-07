import React, { useState } from "react";
import AddMembers from "./AddMembers";

const OfficeBearers = () => {
  const TabMenuItems = [
    {
      text: "Add Members",
      tab: <AddMembers />,
    },
    {
      text: "View Members",
      tab: <div>View Members</div>,
    },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <section className="">
      <div className="h-fit bg-gray px-8 pt-8">
        <p className="text-lg uppercase tracking-wider mb-8">OFFICE BEARERS</p>
        <header className="flex">
          {TabMenuItems.map((item, idx) => {
            return (
              <button
                onClick={() => setSelected(idx)}
                className={`${
                  selected === idx &&
                  "bg-white border-b-blue border-b-4 box-border shadow-lg font-semibold"
                } px-6 py-4`}
              >
                <p className="">{item.text}</p>
              </button>
            );
          })}
        </header>
      </div>
      {TabMenuItems[selected].tab}
    </section>
  );
};

export default OfficeBearers;
