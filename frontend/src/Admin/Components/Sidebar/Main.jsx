import React from "react";
import RootLayout from "./RootLayout";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import UserManagement from "../pages/UserManagement";
import CateogryManagment from "../pages/CateogryManagment";
import AddCategory from "../pages/AddCategory";
import AddProducts from "../pages/AddProducts";
import ProductManagement from "../pages/ProductManagement";
import EditCategory from "../pages/EditCategory";

function Main() {
  return (
    <BrowserRouter>
    <RootLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserManagement />} />
        <Route path="/category" element={<CateogryManagment />} />
        <Route path="/admin/addProducts" element={<AddProducts />} />
        <Route path="/admin/Productmanagement" element={<ProductManagement />} />
        
      </Routes>
    </RootLayout>
    </BrowserRouter>
  );
}

export default Main;
