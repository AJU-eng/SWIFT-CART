import React from "react";
import RootLayout from "./RootLayout";
import { Outlet, Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import UserManagement from "../pages/UserManagement";
import CateogryManagment from "../pages/CateogryManagment";
import AddCategory from "../pages/AddCategory";
import AddProducts from "../pages/AddProducts";
import ProductManagement from "../pages/ProductManagement";
import EditCategory from "../pages/EditCategory";
import EditProduct from "../pages/EditProduct";
import { Link } from "react-router-dom";

// function Main() {
//   return (
//     <BrowserRouter>
//       <RootLayout />

//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/user" element={<UserManagement />} />
//         <Route path="/admin/category" element={<CateogryManagment />} />
//         <Route path="/admin/addProducts" element={<AddProducts />} />
//         <Route
//           path="/admin/Productmanagement"
//           element={<ProductManagement />}
//         />
//         <Route path="/admin/editProduct/:id" element={<EditProduct />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

function Main() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="category" element={<CateogryManagment />} />
          <Route path="products" element={<ProductManagement/>}/>
          <Route path="addProducts" element={<AddProducts/>}/>
          <Route path="products/editProducts/:id" element={<EditProduct/>}/>
          <Route path="editCategory/:id" element={<EditCategory/>}/>
        </Route>
        
      </Routes>
    </RootLayout>
  );
}

export default Main;
