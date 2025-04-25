export const getAllowedDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // If no user exists in localStorage, return empty string
  if (!Object.keys(user)?.length) return "";
  const allowedDashboard = user?.role === "admin" ? "dashboard" : "dashboard/user";

  return allowedDashboard || "";
};
