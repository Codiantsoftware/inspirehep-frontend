import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/frontend/scss/custom.scss";

function UserLayout() {
  return <Outlet />;
}

export default UserLayout;
