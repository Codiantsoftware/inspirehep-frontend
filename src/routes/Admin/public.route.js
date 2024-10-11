import adminRouteMap from "./adminRouteMap";
import { AdminLogin } from "../../pages";

export default function route() {
  return [
    {
      path: adminRouteMap.LOGIN.path,
      name: "Admin Login",
      element: <AdminLogin />,
    },
  ];
}
