import React from "react";
import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default layout;
