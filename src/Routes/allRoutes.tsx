import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Pages/Error404";
import SamplePage from "../pages/Other/SamplePage";

const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/other/sample-page", component: <SamplePage /> },
];

const nonAuthRoutes = [
  //Authentication1

  { path: "/pages/error-404", component: <Error404 /> },
];

export { routes, nonAuthRoutes };
