import { DashboardLayout, PageContainer } from "@toolpad/core";
import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/Base.scss";
import { AuthProvider } from "../context/Auth";
import OrderProvider from "../context/Order/Provider";

export function Layout() {
  return (
    <OrderProvider>
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </OrderProvider>
  );
}

export function Provider() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
