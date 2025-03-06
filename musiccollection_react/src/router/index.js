import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Overview";
import OverviewDetails from "../pages/Overview_Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<OverviewDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;