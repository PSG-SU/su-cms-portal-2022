import { FaCalendarCheck, FaHome } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import { BsCalendarWeek } from "react-icons/bs";

import Approval from "./Faculty/Approval";
import { Navigate } from "react-router-dom";

const list = [
  {
    text: "Proposals",
    link: "/faculty/approval",
    rlink: "approval",
    icon: <FaCalendarCheck />,
    element: <Approval />,
  },
  {
    text: "default",
    link: "/faculty",
    rlink: "",
    element: <Navigate to="/faculty/approval" />,
  },
];

export default list;
