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
  // {
  //   id: "pastPerformance",
  //   label: "Past Performance",
  //   dataPage: null,
  //   link: "/pastPerformance",
  //   icon: "",
  // },
  {
    id: "optionscripts",
    label: "Option Scripts",
    dataPage: null,
    link: "/optionscripts",
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
  {
    id: "staticPages",
    label: "Static Pages",
    dataPage: null,
    link: "/staticPages",
    icon: "",
  },
  {
    id: "contentBytes",
    label: "Content Bytes",
    dataPage: null,
    link: "/contentBytes",
    icon: "",
  },
  {
    id: "notifications",
    label: "Notifications",
    dataPage: null,
    link: "/notifications",
    icon: "",
  },
  {
    id: "userBrokerRegistration",
    label: "User Broker Registration",
    dataPage: null,
    link: "/userBroker",
    icon: "",
  },
  // {
  //   id: "userQuery",
  //   label: "Help",
  //   dataPage: null,
  //   link: "/userQueries",
  //   icon: "",
  // },
  // {
  //   id: "fiidiitrades",
  //   label: "FII/DII Trades",
  //   dataPage: null,
  //   link: "/fiidiitrades",
  //   icon: "",
  // },
];

const userMenuData = [
  {
    id: "dashboard",
    label: "Dashboard",
    dataPage: null,
    link: "/dashboard/user",
    icon: "",
  },
  {
    id: "content",
    label: "Content",
    dataPage: null,
    link: "/content",
    icon: "",
  },
  // {
  //   id: "pastPerformance",
  //   label: "Past Performance",
  //   dataPage: null,
  //   link: "/pastPerformance",
  //   icon: "",
  // },
  {
    id: "education",
    label: "Education",
    dataPage: null,
    link: "/education",
    icon: "",
  },
  {
    id: "event",
    label: "Event",
    dataPage: null,
    link: "/eventlist",
    icon: "",
  },
  {
    id: "userBrokerRegistration",
    label: "User Broker Registration",
    dataPage: null,
    link: "/userBrokerRegistration",
    icon: "",
  },
  // {
  //   id: "helpForm",
  //   label: "Help",
  //   dataPage: null,
  //   link: "/addHelp",
  //   icon: "",
  // },
];

const getMenuByRole = (role: string) => {
  if (role === "admin") return adminMenuData;
  if (role === "customer") return userMenuData;
  return [];
};

export { adminMenuData, userMenuData, getMenuByRole };
