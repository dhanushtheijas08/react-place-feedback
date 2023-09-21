import React from "react";
import { Outlet } from "react-router";
import Map from "../feature/Location/Map";
import Logo from "./Logo";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col md:flex-row w-full relative ">
      <div className="w-full md:w-1/2 bg-slate-700 px-5">
        <Logo />
        <Outlet />
      </div>
      <Map />
    </div>
  );
}
