import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserForm from "./components/UserForm";
import ProgrammerInterface from "./components/ProgrammerInterface";
import ManagerInterface from "./components/ManagerInterface";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="SignIn" replace />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={["user", "manager"]} />}>
          <Route path="UserForm" element={<UserForm />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["programmer"]} />}>
          <Route path="ProgrammerInterface" element={<ProgrammerInterface />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="ManagerInterface" element={<ManagerInterface />} />
        </Route>

        <Route path="*" element={<Navigate to="SignIn" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
