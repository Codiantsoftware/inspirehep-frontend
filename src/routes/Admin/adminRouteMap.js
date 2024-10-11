import { baseRoutes } from "../../helpers/baseRoutes";

const adminRouteMap = {
  LOGIN: { path: `${baseRoutes.adminBaseRoutes}/`},
  DASHBOARD: { path: `${baseRoutes.adminBaseRoutes}/dashboard`},
};
export default adminRouteMap;