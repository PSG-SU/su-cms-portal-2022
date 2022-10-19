import { FaCalendarCheck, FaKey, FaPhotoVideo, FaUsers, FaInfoCircle, FaCalendarDay } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import General from "./Club/General";
import Gallery from "./Club/Gallery";
import Password from "./Club/Password";
import Proposal from "./Club/Proposal";
import Team from "./Club/Team";
import Events from "./Club/Events";

const list = [
  {
    text: "General",
    link: "/club/general",
    icon: <FaInfoCircle />,
    element: <General />,
  },
  {
      text: "Proposal",
      link: "/club/proposal",
      icon: <FaCalendarDay />,
      element: <Proposal />,
  },
  {
      text: "Events",
      link: "/club/events",
      icon: <FaCalendarCheck />,
      element: <Events />,
  },
  {
    text: "Gallery",
    link: "/club/gallery",
    icon: <FaPhotoVideo />,
    element: <Gallery />,
  },
  {
      text: "Team",
      link: "/club/team",
      icon: <FaUsers />,
      element: <Team />,
  },
  {
    text: "Password",
    link: "/club/password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "default",
    link: "/club",
    element: <Navigate to="/club/team" />,
  },
];

export default list;
