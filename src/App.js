import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Clients from "./pages/Clients";

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
      </Routes>
    </Layout>
  );
}

export default App;
