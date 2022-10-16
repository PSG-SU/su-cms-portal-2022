import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUserTie, FaUsers, FaUser, FaUserGraduate, FaPhotoVideo, FaKey, FaCalendarCheck} from "react-icons/fa";


const CMSWrapper = () => {
  const [menuItems, setMenuItems] = useState([]);

  const SUMenuItems = [
    {
      text: "Office Bearers",
      link: "/office-bearers",
      icon: <FaUserTie />,
    },
    {
      text: "User Management",
      link: "/user-management",
      icon: <FaUser />,
    },
    {
      text: "Club Management",
      link: "/club-management",
      icon: <FaUsers />,
    },
    {
      text: "SU Team Staff",
      link: "/su-staff",
      icon: <FaUserGraduate />,
    },
  ]
  const AdminSUMenuItems = [
    {
      text: "Gallery",
      link: "/gallery",
      icon: <FaPhotoVideo />,
    },
    {
      text: "Password",
      link: "/password",
      icon: <FaKey />,
    },
    {
      text: "Event Proposal",
      link: "/proposal",
      icon: <FaCalendarCheck />,
    },
    {
      text: "Team",
      link: "/team",
      icon: <FaUsers />,
    },
  ];

  useEffect(() => {
    setMenuItems(localStorage.getItem("role") !== "admin" ? AdminSUMenuItems : SUMenuItems);
  }, []);

  return (
    <main className="h-screen' w-screen overflow-auto flex">
 
      <nav className="bg-gradient-to-bl from-blue to-black shadow-lg w-1/4 py-8">
        <div className="text-white text-3xl font-semibold mb-8 px-8">
          SU CMS Portal
        </div>
        <div className="flex flex-col w-full">
          {menuItems.map((item, idx) => {
            return (
              <Link to={item.link} key={idx}>
                <div className="text-white text-xl mb-4 flex items-center space-x-4 px-8 hover:bg-cloud hover:text-blue py-2">
                  {item.icon}
                  <p>{item.text}</p>
                </div>
              </Link>
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
