import React from 'react';
import { UserLayout } from '../layouts';
// import { AdminLayout, UserLayout } from '../layouts';
// import { adminRoutes } from './Admin';
import { userRoutes } from './User';


export const routes = () => {
  return [
    // {
    //   element: <AdminLayout />,
    //   children: [...adminRoutes()],
    // },
    {
      element: <UserLayout />,
      children: [...userRoutes()],
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ];
};