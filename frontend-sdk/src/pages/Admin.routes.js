import { FaUser, FaUserGraduate, FaUsers, FaUserTie, FaKey, FaHome, FaPhotoVideo } from "react-icons/fa";

import OfficeBearers from "./Admin/OfficeBearers";
import ClubManagement from "./Admin/ClubManagement";
import UserManagement from "./Admin/UserManagement";
import SUStaff from "./Admin/SUStaff";
import NSS_NCC from "./Admin/NSS_NCC";
import Password from "./Admin/Password";
import About from "./Admin/About";
import Gallery from "./Admin/Gallery";
import { Navigate } from "react-router-dom";

const list = [
  {
    text: "About Home Page",
    link: "/admin/about",
    rlink: "about",
    icon: <FaHome />,
    element: <About />,
  },
  {
    text: "User Management",
    link: "/admin/user-management",
    rlink: "user-management",
    icon: <FaUser />,
    element: <UserManagement />,
  },
  {
    text: "Club Management",
    link: "/admin/club-management",
    rlink: "club-management",
    icon: <FaUsers />,
    element: <ClubManagement />,
  },
  {
    text: "SU Team Staff",
    link: "/admin/su-staff",
    rlink: "su-staff",
    icon: < FaUserTie />,
    element: <SUStaff />,
  },
  {
    text: "SU Office Bearers",
    link: "/admin/office-bearers",
    rlink: "office-bearers",
    icon: <FaUserGraduate />,
    element: <OfficeBearers />,
  },
  {
    text: "NSS / NCC",
    link: "/admin/nss-ncc",
    rlink: "nss-ncc",
    icon: <FaUserTie />,
    element: <NSS_NCC />,
  },
  {
    text: "Password",
    link: "/admin/password",
    rlink: "password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "Gallery",
    link: "/admin/gallery",
    rlink: "gallery",
    icon: <FaPhotoVideo />,
    element: <Gallery />,
  },
  {
    text: "default",
    link: "/admin",
    rlink: "",
    element: <Navigate to="/admin/about" />,
  },
];

export default list;
