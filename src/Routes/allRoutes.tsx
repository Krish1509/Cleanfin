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
import StaticPages from "../pages/Pages/StaticPages";
import UpdateStaticPages from "../pages/Pages/StaticPages/add-edit/add";
import ContentBytes from "../pages/Pages/ContentBytes";
import AddContentBytes from "../pages/Pages/ContentBytes/add-edit/add";

const routes = [
  // Dashboard Routes
  { path: "/dashboard", component: <Dashboard />, allowedRoles: ["admin"] },
  {
    path: "/dashboard/user",
    component: <UserDashboard />,
    allowedRoles: ["customer"],
  },

  // User Routes
  { path: "/user", component: <User />, allowedRoles: ["admin"] },

  // Recommendation Routes
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

  // Static Pages Routes
  {
    path: "/staticPages",
    component: <StaticPages />,
    allowedRoles: ["admin"],
  },
  {
    path: "/staticPages/edit",
    component: <UpdateStaticPages />,
    allowedRoles: ["admin"],
  },

  // Event Routes
  { path: "/event", component: <Event />, allowedRoles: ["admin"] },

  // Feedback Routes
  { path: "/feedback", component: <Feedback />, allowedRoles: ["admin"] },

  {
    path: "/contentBytes",
    component: <ContentBytes />,
    allowedRoles: ["admin"],
  },
  {
    path: "/contentBytes/add",
    component: <AddContentBytes />,
    allowedRoles: ["admin"],
  },
  {
    path: "/contentBytes/edit",
    component: <AddContentBytes />,
    allowedRoles: ["admin"],
  },
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
