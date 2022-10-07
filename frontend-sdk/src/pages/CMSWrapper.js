import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

const CMSWrapper = () => {
  const [menuItems, setMenuItems] = useState([]);

  const SUMenuItems = [
    {
      text: "Office Bearers",
      link: "/office-bearers",
      icon: <BsFillPeopleFill />,
    },
  ];

  useEffect(() => {
    setMenuItems(SUMenuItems);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden flex">
      <nav className="h-screen bg-gradient-to-bl from-blue to-black shadow-lg w-1/4 py-8">
        <div className="text-white text-3xl font-semibold mb-8 px-8">
          SU CMS Portal
        </div>
        <div className="flex flex-col w-full">
          {menuItems.map((item) => {
            return (
              <div className="text-white text-xl mb-4 flex items-center space-x-4 px-8 hover:bg-cloud hover:text-blue py-2">
                {item.icon}
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </nav>
      <div className="w-3/4">
        <Outlet />
      </div>
    </main>
  );
};

export default CMSWrapper;
