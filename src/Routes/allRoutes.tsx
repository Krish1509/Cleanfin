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
import ViewContentBytes from "../pages/Pages/UserDashboard/Content/view";
import Content from "../pages/Pages/UserDashboard/Content";
import EventList from "../pages/Pages/UserDashboard/EventList";
import EditProfile from "../pages/Pages/Profile/edit";
import OptionScripts from "../pages/Pages/OptionScripts";
import Plans from "../pages/Pages/UserDashboard/Plans";
import AddFeedback from "../pages/Pages/Feedback/add";
import Notifications from "../pages/Pages/Notifications";
import PastPerformance from "../pages/Pages/UserDashboard/PastPerformance";
import UserBroker from "../pages/Pages/UserBroker";
import UserBrokerRegistration from "../pages/Pages/UserDashboard/UserBrokerRegistration";
import StaticPage from "../pages/Pages/StaticPage";
import Education from "../pages/Pages/UserDashboard/Education";
import ViewEducation from "../pages/Pages/UserDashboard/Education/view";

const routes = [
  // Dashboard Routes
  {
    path: "/profile/edit",
    component: <EditProfile />,
    allowedRoles: ["admin", "customer"],
  },
  { path: "/dashboard", component: <Dashboard />, allowedRoles: ["admin"] },
  {
    path: "/dashboard/user",
    component: <UserDashboard />,
    allowedRoles: ["customer"],
  },
  {
    path: "/content",
    component: <Content />,
    allowedRoles: ["customer"],
  },
  {
    path: "/content/view",
    component: <ViewContentBytes />,
    allowedRoles: ["customer"],
  },

  // Education
  {
    path: "/education",
    component: <Education />,
    allowedRoles: ["customer"],
  },
  {
    path: "/education/view",
    component: <ViewEducation />,
    allowedRoles: ["customer"],
  },
  {
    path: "/plans",
    component: <Plans />,
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

  // Option Scripts Routes
  {
    path: "/optionscripts",
    component: <OptionScripts />,
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
  { path: "/eventlist", component: <EventList />, allowedRoles: ["customer"] },

  // Feedback Routes
  { path: "/feedback", component: <Feedback />, allowedRoles: ["admin"] },
  {
    path: "/feedback/add",
    component: <AddFeedback />,
    allowedRoles: ["customer"],
  },

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
  {
    path: "/notifications",
    component: <Notifications />,
    allowedRoles: ["admin"],
  },
  // Past Performance Route
  {
    path: "/pastPerformance",
    component: <PastPerformance />,
    allowedRoles: ["customer", "admin"],
  },

  // User Broker Registration
  {
    path: "/userBrokerRegistration",
    component: <UserBrokerRegistration />,
    allowedRoles: ["customer"],
  },
  {
    path: "/userBroker",
    component: <UserBroker />,
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
  { path: "pages/:pageName", component: <StaticPage /> },
  // Add a catch-all route for 404 errors
  { path: "*", component: <Error404 /> },
];

export { routes, nonAuthRoutes };
