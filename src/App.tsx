import React, { useState } from "react";
import "./styles/Base.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation, Session } from "@toolpad/core";
import { Outlet } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { useAuth } from "./context/Auth";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Chung",
  },
  {
    segment: "dashboard",
    title: "Tổng quan",
    icon: <DashboardIcon />,
  },
  {
    segment: "order",
    title: "Đơn hàng",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Chi tiết",
  },
  {
    segment: "reports",
    title: "Báo cáo",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1600,
      xl: 1536,
    },
  },
});

// const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

const BRANDING = {
  title: "Quản lý đơn hàng",
};

function App() {
  const { user, logout } = useAuth();
  const [session, setSession] = useState<Session | null>({
    user,
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        if (user) {
          setSession({ user });
        } else {
          window.location.href = "/signin";
        }
      },
      signOut: () => {
        setSession(null);
        logout();
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={BRANDING}
      session={session}
      authentication={authentication}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
