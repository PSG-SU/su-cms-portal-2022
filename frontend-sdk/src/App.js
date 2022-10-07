import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CMSWrapper from "./pages/CMSWrapper";
import Login from "./pages/Login";
import OfficeBearers from "./pages/OfficeBearers";
import UserManagement from "./pages/UserManagement";
import "./styles/tailwind.output.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route inedx element={<CMSWrapper />}>
          <Route path="office-bearers" element={<OfficeBearers />} />
        </Route>
        <Route inedx element={<CMSWrapper />}>
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
