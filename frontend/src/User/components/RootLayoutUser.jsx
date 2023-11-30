import React from "react";
import { Outlet } from "react-router-dom";
import UserSideBar from "./userSidebar";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";

// function RootLayout({ children }) {
//   return (
//     <div className="flex gap-5">
//       <SideBarDesign />
//       <main className="max-w-5xl flex-1 mx-auto py-4">
//         {children}
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default RootLayout;
function RootLayoutUser({ children }) {
  return (
    <>
    <AuthenticatedNavbar/>
    <div className='flex gap-5 mt-1 '>
      <UserSideBar />
      <main className='max-w-5xl flex-1 mx-auto py-4'>
        {children}
        {/* Render child routes from the "admin" route here */}
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default RootLayoutUser;
