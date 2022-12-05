import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL, AUTH_URL } from "../API/config";
import SUMenuItems from "./User.routes.js";
import { MdLogout } from "react-icons/md";
import { toast } from "react-hot-toast";

const UserWrapper = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("rights"));
    localStorage.getItem("token") && (localStorage.getItem("rights") === "developer" || localStorage.getItem("rights") === "club")
      ? axios
        .get(LOGIN_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMenuItems(SUMenuItems);
        })
      : navigate("/login");
  }, []);

  useEffect(() => {
    axios
      .get(AUTH_URL)
      .then((res) => {
        const user = res.data.filter(
          (user) => user.userId === localStorage.getItem("userId")
        );
        setUsername(user[0].associationName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("rights");
    toast("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <main className="h-screen w-screen overflow-auto flex">
      <nav className="bg-gradient-to-bl from-blue to-black shadow-lg w-1/4 overflow-hidden py-8 h-screen">
        <div className="text-white text-3xl font-semibold mb-2 px-8 w-full">
          SU CMS Portal
        </div>
        <p className="text-xs uppercase tracking-wider mb-4 px-8 text-white">
          {username}
        </p>
        <div className="flex flex-col w-full h-[calc(100vh-10rem)]">
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
          <div className="flex-1"></div>
          <button
            onClick={(e) => handleLogout(e)}
            className="text-white text-xl mb-4 flex items-center space-x-4 px-8 hover:bg-cloud hover:text-blue py-2"
          >
            <MdLogout />
            <p>Logout</p>
          </button>
          <p className="text-xs text-white px-8">
            A Product for PSG College of Technology, Coimbatore.
          </p>
        </div>
      </nav>
      <div className="w-3/4 overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
};

export default UserWrapper;
