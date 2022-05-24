import { Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Button } from "antd";
import login from "./api/login";

import Login from "./pages/Login";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
