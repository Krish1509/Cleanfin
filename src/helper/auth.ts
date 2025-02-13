export const getAllowedDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const allowedDashboard =
    user?.role === "admin" ? "dashboard" : "dashboard/user";

  return allowedDashboard || "";
};
