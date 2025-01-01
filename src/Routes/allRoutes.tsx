import Dashboard from "../pages/Dashboard";
import User from "../pages/Pages/User";
import Feedback from "../pages/Pages/Feedback";
import Error404 from "../pages/Pages/Error404";
import SamplePage from "../pages/Other/SamplePage";
import Login from "../pages/Pages/Auth/Login";
import Recommendation from "../pages/Pages/Recommendation";
import Event from "../pages/Pages/Event";

const routes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/user", component: <User /> },
  { path: "/recommendation", component: <Recommendation /> },
  { path: "/event", component: <Event /> },
  { path: "/feedback", component: <Feedback /> },
  { path: "/other/sample-page", component: <SamplePage /> },
];

const nonAuthRoutes = [
  //Authentication1
  { path: "/login", component: <Login /> },
  { path: "/pages/error-404", component: <Error404 /> },
  // Add a catch-all route for 404 errors
  { path: "*", component: <Error404 /> },
];

export { routes, nonAuthRoutes };
