// import Banner from "./components/Banner"
// import Navbar from "./components/Navbar"
import Main from "./Admin/Components/Sidebar/Main";
import Home from "./User/Home";
import FormAuth from "./User/components/Form_auth";
import Otp from "./User/components/Otp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsDetailPage from "./User/components/ProductsDetailPage";
import Authentication from "./User/components/Authentication";
import axios from "axios";
import AuthenticatedNavbar from "./User/components/Navbar/AuthenticatedNavbar";
import UnAuthorizedHome from "./User/UnAuthorizedHome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logged } from "./redux/features/userslice";
import Category from "./User/components/Category";
import CateogryManagment from "./Admin/Components/pages/CateogryManagment";

axios.defaults.withCredentials = true;

function App() {
  const user = useSelector((state) => state.logged.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logged());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <UnAuthorizedHome />} />
          <Route path="/register" element={<FormAuth />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/ProductDetail/:id" element={<ProductsDetailPage />} />
          <Route path="/admin" element={<Main/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Main/>    */}
      {/* <Authentication/> */}
      {/* <Home/>  */}

      {/* <ProductsDetailPage/> */}
    </>
  );
}

export default App;
