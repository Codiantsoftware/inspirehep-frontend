import React from "react";
import { Outlet} from "react-router-dom";

function AdminPrivateLayout() {
  return (
      <div>
            <h2>Admin Header</h2>
            <Outlet />
            <h2>Admin Footer</h2>
      </div>
  );
}

export default AdminPrivateLayout;
