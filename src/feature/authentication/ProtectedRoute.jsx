import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../contexts/Authentication";

export default function ProtectedRoute({ children }) {
  const {
    state: { isAuthenticated },
  } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return isAuthenticated ? children : null;
}
