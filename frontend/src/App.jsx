import Main from "./Admin/Components/Sidebar/Main";
import Home from "./User/Home";
import FormAuth from "./User/components/Form_auth";
import Otp from "./User/components/Otp";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import ForgetPassword from "./User/components/forgetPassword";
import ForgetOtp from "./User/components/forgetOtp";
import { adminLogged } from "./redux/features/AdminSlice";
import ResetPassword from "./User/components/resetPassword";

axios.defaults.withCredentials = true;

function App() {
  const user = useSelector((state) => state.logged.logged);
  const admin = useSelector((state) => state.admin.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logged());
    dispatch(adminLogged());
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
          <Route path="/admin/*" element={<Main />} />

          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/otpForgetPassword" element={<ForgetOtp />} />
          <Route  path="/resetPass" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
      {/* <ResetPassword/> */}
    </>
  );
}

export default App;
