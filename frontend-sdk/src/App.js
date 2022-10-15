import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CMSWrapper from "./pages/CMSWrapper";
import Login from "./pages/Login";
import OfficeBearers from "./pages/Admin/OfficeBearers";
import ClubManagement from "./pages/Admin/ClubManagement";
import UserManagement from "./pages/Admin/UserManagement";
import SUStaff from "./pages/Admin/SUStaff";
import Gallery from "./pages/Club/Gallery";
import Password from "./pages/Club/Password";
import Proposal from "./pages/Club/Proposal";
import "./styles/tailwind.output.css";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<CMSWrapper />}>
          <Route path="office-bearers" element={<OfficeBearers />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="club-management" element={<ClubManagement />} />
          <Route path="su-staff" element={<SUStaff />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="password" element={<Password />} />
          <Route path="proposal" element={<Proposal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
