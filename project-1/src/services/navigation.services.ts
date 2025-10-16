export const getDashboardPath = (role: string) => {
  switch (role) {
    case "Super-Admin":
      return "/dashboards/super-admin";
    case "Admin":
      return "/dashboards/admin";
    case "Student":
      return "/dashboards/student";
    default:
      return "/";
  }
};
