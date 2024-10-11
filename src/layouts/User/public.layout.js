import React from "react";
import { Outlet } from "react-router-dom";

function UserPublicLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default UserPublicLayout;
