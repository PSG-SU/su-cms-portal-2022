import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../API/config";
import AdminSUMenuItems from "./Admin.routes.js";
import SUMenuItems from "./User.routes.js";

const CMSWrapper = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token")
      ? axios
          .get(LOGIN_URL, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
      : navigate("/login");
    setMenuItems(
      localStorage.getItem("role") === "admin" ? AdminSUMenuItems : SUMenuItems
    );
  }, []);

  return (
    <main className="h-screen w-screen overflow-auto flex">
      <nav className="bg-gradient-to-bl from-blue to-black shadow-lg w-1/4 overflow-hidden py-8">
        <div className="text-white text-3xl font-semibold mb-8 px-8 w-full">
          SU CMS Portal
        </div>
        <div className="flex flex-col w-full">
          {menuItems.map((item, idx) => {
            return item.text !== "default" ? (
              <Link to={item.link} key={idx}>
                <div className="text-white text-xl mb-4 flex items-center space-x-4 px-8 hover:bg-cloud hover:text-blue py-2">
                  {item.icon}
                  <p>{item.text}</p>
                </div>
              </Link>
            ) : (
              <React.Fragment />
            );
          })}
        </div>
      </nav>
      <div className="w-3/4 overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
};

export default CMSWrapper;
