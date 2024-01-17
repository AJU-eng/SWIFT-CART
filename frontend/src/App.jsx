import Main from "./Admin/Components/Sidebar/Main";
import Home from "./User/Home";
import FormAuth from "./User/components/Form_auth";
import Otp from "./User/components/Otp";
import { SkeletonTheme } from "react-loading-skeleton";
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
import VerificationPage from "./User/components/verification_page";
import Navbar from "./User/components/Navbar/Navbar";
import Cart from "./User/components/Cart";
import SIdebarRoutes from "./User/components/SIdebarRoutes";
import Checkout from "./User/components/Checkout";
import OrderSucessPage from "./User/components/OrderSucessPage";
import OrderDetails from "./User/components/OrderDetails";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector((state) => state.logged.logged);
  const admin = useSelector((state) => state.admin.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logged());
    dispatch(adminLogged());
  }, [dispatch]);

  const ProtectRoute=({element})=>{
    // const user=useSelector((state)=>state.logged.user)
    return user ? element :<Navigate to="/login"/>
  }
  return (
    <>
      <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d9d9d9 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home /> : <UnAuthorizedHome />} />
            <Route path="/register" element={<FormAuth />} />
            <Route path="/otp" element={<Otp />} />
            {/* <Route path="/home" element={<ProtectRoute element={<Home />} />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/ProductDetail/:id" element={<ProductsDetailPage />} />
            <Route path="/routes/*"  element={<SIdebarRoutes/>}/>
            <Route path="/admin/*" element={<Main />} />
            <Route path="/orderSucess"  element={<OrderSucessPage/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/cart"  element={<Cart/>}/>
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/otpForgetPassword" element={<ForgetOtp />} />
            <Route path="/resetPass" element={<ResetPassword />} />
            <Route path="/sucesPage" element={<VerificationPage />} />
           
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
   
      {/* <VerificationPage/> */}
      {/* <ResetPassword/> */}
    </>
  );
}

export default App;
