import { FaCalendarCheck, FaHome } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";

import Approval from "./Dean/Approval";
import { Navigate } from "react-router-dom";

const list = [
  {
    text: "Proposals",
    link: "/dean/approval",
    rlink: "approval",
    icon: <FaCalendarCheck />,
    element: <Approval />,
  },
  {
    text: "Report Generation",
    link: "/dean/approval",
    rlink: "approval",
    icon: <VscFilePdf />,
    element: <Approval />,
  },
  {
    text: "default",
    link: "/dean",
    rlink: "",
    element: <Navigate to="/dean/approval" />,
  },
];

export default list;
