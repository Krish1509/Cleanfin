import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Pages/Error404";
import SamplePage from "../pages/Other/SamplePage";
import Login from "../pages/Pages/Auth/Login";

const routes = [
  { path: "/dashboard", component: <Dashboard /> },
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
