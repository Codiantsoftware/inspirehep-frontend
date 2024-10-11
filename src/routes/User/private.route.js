import { Literature, UserHome } from "../../pages/User";
import userRouteMap from "./userRouteMap";

export default function route() {
  return [
    {
      path: userRouteMap.USERHOME.path,
      name: "Home",
      element: <UserHome />
    },
    {
      path: userRouteMap.LITERATURE.path,
      name: "literature",
      element: <Literature />
    }
  ];
}
