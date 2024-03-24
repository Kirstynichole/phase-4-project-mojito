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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
