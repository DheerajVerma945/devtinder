import React from "react";
import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";
import HomeComing from "../components/HomeComing";

const layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <HomeComing />
      <Footer />
    </div>
  );
};

export default layout;
