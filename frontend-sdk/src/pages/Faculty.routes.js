import { FaCalendarCheck, FaKey, FaFileAlt, FaPhotoVideo, FaBug } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BsCalendarWeek } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";

import { Navigate } from "react-router-dom";
import Password from "./Faculty/Password";
import AllProposals from "./Faculty/AllProposalsStatus";
import ApprovalVerification from "./Faculty/ApprovalVerification";
import FacultyApprovals from "./Faculty/FacultyApproval";
import EventReport from "./Faculty/EventReports";
import Calendar from "./Faculty/Calendar";
import PDFReportGen from "./Faculty/PDFReportGen";
import Bugs from "./Common/Bugs"

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
    text: "Event Reports",
    link: "/faculty/event-reports",
    rlink: "event-reports",
    icon: <FaPhotoVideo />,
    element: <EventReport />,
  },
  {
    text: "PDF Report Generation",
    link: "/faculty/report-generation",
    rlink: "report-generation",
    icon: <VscFilePdf />,
    element: <PDFReportGen />,
  },
  {
    text: "Password",
    link: "/faculty/password",
    rlink: "password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "Bugs / Feature Requests",
    link: "/faculty/bugs",
    rlink: "bugs",
    icon: <FaBug />,
    element: <Bugs />,
  },
  {
    text: "default",
    link: "/faculty",
    rlink: "",
    element: <Navigate to="/faculty/approval" />,
  },
];

export default list;
