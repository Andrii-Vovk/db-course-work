import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";

function App() {
  const token = useSelector((state) => state.auth.jwtToken);

  return (
    <Layout>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/documents"
          element={token ? <Documents /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/"
          element={token ? <Clients /> : <Navigate to="/login" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
