import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Provider } from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import OrderForm from "./pages/OrderForm";

const router = createBrowserRouter([
  {
    Component: Provider,
    children: [
      {
        path: "/",
        Component: App,
        children: [
          {
            Component: Layout,
            children: [
              {
                path: "/",
                Component: Dashboard,
              },
              {
                path: "/dashboard",
                Component: Dashboard,
              },
              {
                path: "/order",
                Component: OrderForm,
              },
              {
                path: "/order/:id",
                Component: OrderForm,
              },
            ],
          },
        ],
      },
      {
        path: "/signin",
        Component: SignIn,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
