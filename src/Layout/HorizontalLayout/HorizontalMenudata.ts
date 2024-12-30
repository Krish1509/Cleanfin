const horizontalData = [
  {
    id: "dashboard",
    label: "Dashboard",
    dataPage: null,
    link: "/",
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
    id: "feedback",
    label: "Feedback",
    dataPage: null,
    link: "/feedback",
    icon: "",
  },
  {
    id: "navigation",
    label: "Navigation",
    dataPage: null,
    link: "#",
    icon: "",
    submenu: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "ph-duotone ph-gauge",
        link: "/dashboard",
        dataPage: "index",
        badge: "2",
        submenu: [
          {
            id: "analytics",
            label: "Analytics",
            link: "/dashboard",
            dataPage: "analytics",
          },
          {
            id: "affiliate",
            label: "Affiliate",
            link: "/affiliate-dashboard",
            dataPage: "affiliate",
          },
          {
            id: "finance",
            label: "Finance",
            link: "/finance-dashboard",
            dataPage: "finance",
          },
          {
            id: "helpdesk",
            label: "Helpdesk",
            link: "/helpdesk-dashboard",
            dataPage: "helpdesk",
          },
          {
            id: "invoice",
            label: "Invoice",
            link: "/Invoice-dashboard",
            dataPage: "invoice",
          },
        ],
      },
    ],
  },
];

export { horizontalData };
