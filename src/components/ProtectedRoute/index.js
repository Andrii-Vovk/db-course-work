import React from "react";

import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = useSelector((state) => state.auth.token);

  return token ? <Route {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
