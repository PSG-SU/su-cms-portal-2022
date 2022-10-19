import { FaUser, FaUserGraduate, FaUsers, FaUserTie, FaKey, FaHome, FaPhotoVideo } from "react-icons/fa";

import OfficeBearers from "./Admin/OfficeBearers";
import ClubManagement from "./Admin/ClubManagement";
import UserManagement from "./Admin/UserManagement";
import SUStaff from "./Admin/SUStaff";
import Password from "./Admin/Password";
import About from "./Admin/About";
import Gallery from "./Admin/Gallery";
import { Navigate } from "react-router-dom";

const list = [
  {
    text: "About Home Page",
    link: "/admin/about",
    icon: <FaHome />,
    element: <About />,
  },
  {
    text: "User Management",
    link: "/admin/user-management",
    icon: <FaUser />,
    element: <UserManagement />,
  },
  {
    text: "Club Management",
    link: "/admin/club-management",
    icon: <FaUsers />,
    element: <ClubManagement />,
  },
  {
    text: "SU Team Staff",
    link: "/admin/su-staff",
    icon: <FaUserGraduate />,
    element: <SUStaff />,
  },
  {
    text: "SU Office Bearers",
    link: "/admin/office-bearers",
    icon: <FaUserTie />,
    element: <OfficeBearers />,
  },
  {
    text: "Password",
    link: "/admin/password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "Gallery",
    link: "/admin/gallery",
    icon: <FaPhotoVideo />,
    element: <Gallery />,
  },
  {
    text: "default",
    link: "/admin",
    element: <Navigate to="/admin/about" />,
  },
];

export default list;
