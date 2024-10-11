import { baseRoutes } from "../../helpers/baseRoutes";

const userRouteMap = {
  USERHOME: { path: `${baseRoutes.userBaseRoutes}` },
  LITERATURE: { path: `${baseRoutes.userBaseRoutes}literature/:id` }
};
export default userRouteMap;
