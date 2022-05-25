import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";
import InsuranceProposals from "./pages/InsuranceProposals";
import InsuranceObjects from "./pages/InsuranceObjects";
import Policies from "./pages/Policies";
import Employees from "./pages/Employees";
import Salaries from "./pages/Salaries";
import BankCredentials from "./pages/BankCredentials";
import Admin from "./pages/Admin";

import Incidents from "./pages/Incidents";

function App() {
  const token = useSelector((state) => state.auth.jwtToken);

  return (
    <Layout>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={token ? <Clients /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/documents"
          element={token ? <Documents /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/proposals"
          element={token ? <InsuranceProposals /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/objects"
          element={token ? <InsuranceObjects /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/policies"
          element={token ? <Policies /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/incidents"
          element={token ? <Incidents /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/employees"
          element={token ? <Employees /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/salaries"
          element={token ? <Salaries /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/bankCredentials"
          element={token ? <BankCredentials /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/admin"
          element={token ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
