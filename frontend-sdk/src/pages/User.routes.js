import { FaCalendarCheck, FaKey, FaPhotoVideo, FaUsers, FaInfoCircle, FaCalendarDay, FaBug } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import General from "./Club/General";
import EventReports from "./Club/EventReports";
import Password from "./Club/Password";
import Proposal from "./Club/Proposal";
import Team from "./Club/Team";
import Events from "./Club/Events";
import Bugs from "./Common/Bugs";

const list = [
  {
    text: "General",
    link: "/club/general",
    rlink: "general",
    icon: <FaInfoCircle />,
    element: <General />,
  },
  {
    text: "Event Proposal",
    link: "/club/proposal",
    rlink: "proposal",
    icon: <FaCalendarDay />,
    element: <Proposal />,
  },
  {
    text: "Publish Events",
    link: "/club/events",
    rlink: "events",
    icon: <FaCalendarCheck />,
    element: <Events />,
  },
  {
    text: "Event Reports",
    link: "/club/reports",
    rlink: "reports",
    icon: <FaPhotoVideo />,
    element: <EventReports />,
  },
  {
    text: "Team",
    link: "/club/team",
    rlink: "team",
    icon: <FaUsers />,
    element: <Team />,
  },
  {
    text: "Password",
    link: "/club/password",
    rlink: "password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "Bugs / Feature Requests",
    link: "/club/bugs",
    rlink: "bugs",
    icon: <FaBug />,
    element: <Bugs />,
  },
  {
    text: "default",
    link: "/club",
    rlink: "",
    element: <Navigate to="/club/general" />,
  },
];

export default list;
