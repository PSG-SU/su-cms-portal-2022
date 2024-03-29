import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";

import "./styles/tailwind.output.css";
import { Toaster } from "react-hot-toast";

import AdminSUMenuItems from "./pages/Admin.routes.js";
import SUMenuItems from "./pages/User.routes.js";
import FacultyMenuItems from "./pages/Faculty.routes.js";
import DeanSUMenuItems from "./pages/Dean.routes.js";

import AdminWrapper from "./pages/AdminWrapper";
import UserWrapper from "./pages/UserWrapper";
import DeanWrapper from "./pages/DeanWrapper";
import FacultyWrapper from "./pages/FacultyWrapper";

import Error404 from "./pages/Error404";
import Refresher from "./Refresher";

const App = () => {
  return (
    <Refresher>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="admin" element={<AdminWrapper />}>
            {AdminSUMenuItems.map((item) => (
              <Route key={item.text} path={item.rlink} element={item.element} />
            ))}
          </Route>
          <Route path="club" element={<UserWrapper />}>
            {SUMenuItems.map((item) => (
              <Route key={item.text} path={item.rlink} element={item.element} />
            ))}
          </Route>
          <Route path="faculty" element={<FacultyWrapper />}>
            {FacultyMenuItems.map((item) => (
              <Route key={item.text} path={item.rlink} element={item.element} />
            ))}
          </Route>
          <Route path="dean" element={<DeanWrapper />}>
            {DeanSUMenuItems.map((item) => (
              <Route key={item.text} path={item.rlink} element={item.element} />
            ))}
          </Route>
          <Route path="404-error" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404-error" />} />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Refresher>
  );
};

export default App;
