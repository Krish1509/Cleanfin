const adminMenuData = [
  {
    id: "dashboard",
    label: "Dashboard",
    dataPage: null,
    link: "/dashboard",
    icon: "",
  },
  {
    id: "user",
    label: "User",
    dataPage: null,
    link: "/user",
    icon: "",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    dataPage: null,
    link: "/recommendation",
    icon: "",
  },
  {
    id: "event",
    label: "Event",
    dataPage: null,
    link: "/event",
    icon: "",
  },
  {
    id: "feedback",
    label: "Feedback",
    dataPage: null,
    link: "/feedback",
    icon: "",
  },
];

const userMenuData = [
  {
    id: "dashboard",
    label: "Dashboard",
    dataPage: null,
    link: "/dashboard/user",
    icon: "",
  },
];

const getMenuByRole = (role: string) => {
  if (role === "admin") return adminMenuData;
  if (role === "customer") return userMenuData;
  return [];
};

export { adminMenuData, userMenuData, getMenuByRole };
