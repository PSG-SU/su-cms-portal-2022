import { FaCalendarCheck, FaKey, FaFileAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BsCalendarWeek } from "react-icons/bs";

import { Navigate } from "react-router-dom";
import Password from "./Faculty/Password";
import AllProposals from "./Faculty/AllProposalsStatus";
import ApprovalVerification from "./Faculty/ApprovalVerification";
import FacultyApprovals from "./Faculty/FacultyApproval";
import Calendar from "./Faculty/Calendar";

const list = [
  {
    text: "Pending Proposals",
    link: "/faculty/approval",
    rlink: "approval",
    icon: <IoMdTime />,
    element: <FacultyApprovals />,
  },
  {
    text: "Principal Approval Verification",
    link: "/faculty/approval-verification",
    rlink: "approval-verification",
    icon: <FaFileAlt />,
    element: <ApprovalVerification />,
  },
  {
    text: "All Proposals Status",
    link: "/faculty/all-proposals",
    rlink: "all-proposals",
    icon: <FaCalendarCheck />,
    element: <AllProposals />,
  },
  {
    text: "Calendar View",
    link: "/faculty/calendar",
    rlink: "calendar",
    icon: <BsCalendarWeek />,
    element: <Calendar />,
  },
  {
    text: "Password",
    link: "/faculty/password",
    rlink: "password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "default",
    link: "/faculty",
    rlink: "",
    element: <Navigate to="/faculty/approval" />,
  },
];

export default list;
