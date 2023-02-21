import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

import Info from "./pages/Info";

import ProtectedRoutes from "./components/ProtectedRoutes";
import { ALLOWED_ROLES } from "./config/allowedRolesConfig";
import Unauthorized from "./pages/Unauthorized";
import CheckToken from "./components/CheckToken";

import Layout from "./pages/Layout";
import Employee from "./pages/Employee";
import Unit from "./pages/Unit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route element={<CheckToken />}>
          <Route path="home" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Employee]} />}>
            <Route path="employee" element={<Employee />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Admin, ALLOWED_ROLES.Employee, ALLOWED_ROLES.Owner]} />
            }
          >
            <Route path="info" element={<Info />} />
            <Route path="units/:id" element={<Unit />} />
          </Route>
        </Route>

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
