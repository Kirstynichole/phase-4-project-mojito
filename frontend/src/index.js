import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Error from "./Error";
import Transactions from "./components/Transactions";
import ViewBudgets from "./components/ViewBudgets";
import Spend from "./components/Spend";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewBudget from "./components/NewBudget";
import About from "./components/About";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "spend",
        element: <Spend />,
      },
      {
        path: "viewbudgets",
        element: <ViewBudgets />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "newbudget",
        element: <NewBudget />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
