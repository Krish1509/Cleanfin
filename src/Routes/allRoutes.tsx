import Dashboard from "../pages/Dashboard";
import User from "../pages/Pages/User";
import Feedback from "../pages/Pages/Feedback";
import Error404 from "../pages/Pages/Error404";
import Login from "../pages/Pages/Auth/Login";
import Recommendation from "../pages/Pages/Recommendation";
import PublicRoutes from "./PublicRoutes";
import Event from "../pages/Pages/Event";
import Unauthorized from "../pages/Pages/Unauthorized";
import UserDashboard from "../pages/Pages/UserDashboard/Dashboard";
import AddRecommendation from "../pages/Pages/Recommendation/add-edit/add";

const routes = [
  { path: "/dashboard", component: <Dashboard />, allowedRoles: ["admin"] },
  {
    path: "/dashboard/user",
    component: <UserDashboard />,
    allowedRoles: ["customer"],
  },
  { path: "/user", component: <User />, allowedRoles: ["admin"] },
  {
    path: "/recommendation",
    component: <Recommendation />,
    allowedRoles: ["admin"],
  },
  {
    path: "/recommendation/add",
    component: <AddRecommendation />,
    allowedRoles: ["admin"],
  },
  {
    path: "/recommendation/edit",
    component: <AddRecommendation />,
    allowedRoles: ["admin"],
  },
  { path: "/event", component: <Event />, allowedRoles: ["admin"] },
  { path: "/feedback", component: <Feedback />, allowedRoles: ["admin"] },
];

const nonAuthRoutes = [
  //Authentication1
  {
    path: "/login",
    component: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  { path: "/pages/error-404", component: <Error404 /> },
  { path: "/unauthorized", component: <Unauthorized /> },
  // Add a catch-all route for 404 errors
  { path: "*", component: <Error404 /> },
];

export { routes, nonAuthRoutes };
