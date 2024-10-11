import React from "react";

// export const AdminLayout = React.lazy(() => import("./Admin/index.layout"));
// export const AdminPublicLayout = React.lazy(() => import("./Admin/public.layout"));
// export const AdminPrivateLayout = React.lazy(() => import("./Admin/private.layout"));

export const UserLayout = React.lazy(() => import("./User/index.layout"));
export const UserPublicLayout = React.lazy(() => import("./User/public.layout"));
export const UserPrivateLayout = React.lazy(() => import("./User/private.layout"));
