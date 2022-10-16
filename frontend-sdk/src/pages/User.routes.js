import { FaCalendarCheck, FaKey, FaPhotoVideo, FaUsers } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import Gallery from "./Club/Gallery";
import Password from "./Club/Password";
import Proposal from "./Club/Proposal";
import Team from "./Club/Team";

const list = [
  {
    text: "Gallery",
    link: "/gallery",
    icon: <FaPhotoVideo />,
    element: <Gallery />,
  },
  {
    text: "Password",
    link: "/password",
    icon: <FaKey />,
    element: <Password />,
  },
  {
    text: "Event Proposal",
    link: "/proposal",
    icon: <FaCalendarCheck />,
    element: <Proposal />,
  },
  {
    text: "Team",
    link: "/team",
    icon: <FaUsers />,
    element: <Team />,
  },
  {
    text: "default",
    link: "/",
    element: <Navigate to="/gallery" />,
  },
];

export default list;
