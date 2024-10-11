import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

function UserPrivateLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserPrivateLayout;
