import React from "react";
import { AuthProvider } from "../context/Auth";
import { Outlet } from "react-router-dom";

export default function Providers() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
