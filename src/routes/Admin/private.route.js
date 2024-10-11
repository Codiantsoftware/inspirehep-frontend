import adminRouteMap from "./adminRouteMap";
import { AdminDashboard } from "../../pages";

export default function route() {
  return [
    {
      path: adminRouteMap.DASHBOARD.path,
      name: "Dashboard",
      element:<AdminDashboard />,
    },
  ];
}
