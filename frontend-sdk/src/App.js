import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CMSWrapper from "./pages/CMSWrapper";
import Login from "./pages/Login";
import OfficeBearers from "./pages/OfficeBearers";
import Clubs from "./pages/Clubs";
import UserManagement from "./pages/UserManagement";
import SUStaff from "./pages/SUStaff";
import "./styles/tailwind.output.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<CMSWrapper />}>
          <Route path="office-bearers" element={<OfficeBearers />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="su-staff" element={<SUStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
