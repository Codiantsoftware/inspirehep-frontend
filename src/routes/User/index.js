import { UserPrivateLayout, UserPublicLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";

export const userRoutes = () => {
  return [
    {
      element: <UserPublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <UserPrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
