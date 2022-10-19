import { FaUser, FaUserGraduate, FaUsers, FaUserTie } from "react-icons/fa";

import OfficeBearers from "./Admin/OfficeBearers";
import ClubManagement from "./Admin/ClubManagement";
import UserManagement from "./Admin/UserManagement";
import SUStaff from "./Admin/SUStaff";
import NSS_NCC from "./Admin/NSS_NCC";
import { Navigate } from "react-router-dom";

const list = [
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
    text: "Office Bearers",
    link: "/admin/office-bearers",
    icon: <FaUserTie />,
    element: <OfficeBearers />,
  },
  {
    text: "NSS/NCC",
    link: "/admin/nss-ncc",
    icon: <FaUserTie />,
    element: <NSS_NCC />,
  },
  {
    text: "default",
    link: "/admin",
    element: <Navigate to="/admin/user-management" />,
  },
];

export default list;
