import React from "react";
import SideBarDesign from "./SideBarDesign";
import { Outlet } from "react-router-dom";

function RootLayout({ children }) {
  return (
    <div className="flex gap-5 ">
      <SideBarDesign />
      <main className="max-w-5xl flex-1 mx-auto py-4 ">
        {children}
        {/* Render child routes from the "admin" route here */}
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
