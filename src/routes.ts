import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/index"));


export const routes_content = () => [
  {
    path: "/home",
    exact: true,
    name: 'Home',
    element: Dashboard,
  },
];

