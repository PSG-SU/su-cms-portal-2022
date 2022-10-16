import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CMSWrapper from "./pages/CMSWrapper";
import Login from "./pages/Login";

import "./styles/tailwind.output.css";
import { Toaster } from "react-hot-toast";

import AdminSUMenuItems from "./pages/Admin.routes.js";
import SUMenuItems from "./pages/User.routes.js";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<CMSWrapper />}>
          {AdminSUMenuItems.map((item) => (
            <Route key={item.text} path={item.link} element={item.element} />
          ))}
          {SUMenuItems.map((item) => (
            <Route key={item.text} path={item.link} element={item.element} />
          ))}
        </Route>
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
