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
import { isBlocked, logged } from "./redux/features/userslice";
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
import Products from "./User/components/products"
import BlockedPage from "./User/components/BlockedPage";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector((state) => state.user.logged);
  const admin = useSelector((state) => state.admin.logged);
  const isBlock=useSelector((state)=>state.user.Blocked)
  // const nav=useNavigate()
  console.log(isBlock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logged());
    dispatch(adminLogged());
   dispatch(isBlocked())
   console.log(isBlock,"blockedjhgbjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhgjhg");
    // alert('d')
    // console.log(a,"()");
  }, [user,isBlock,dispatch]);

  useEffect(()=>{
    if (isBlock) {
      // nav("/login")
    }
  },[])


  // const ProtectRoute=({element})=>{
  //   // const user=useSelector((state)=>state.logged.user)
  //   return user ? element :<Navigate to="/login"/>
  // }
  return (
    <>
      <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d9d9d9 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home /> : <UnAuthorizedHome />} />
            <Route path="/register" element={<FormAuth />} />
            <Route path="/otp" element={<Otp />} />
            {/* <Route path="/home" element={<ProtectRoute element={<Home />} />} /> */}
            <Route path="/home" element={user && !isBlock?<Home />:isBlock?<BlockedPage/>:  <Authentication/>} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/ProductDetail/:id" element={<ProductsDetailPage />} />
            <Route path="/routes/*"  element={user && !isBlock?<SIdebarRoutes/>:isBlock?<BlockedPage/>: <Authentication/>}/>
            <Route path="/admin/*" element={<Main />} />
            <Route path="/orderSucess"  element={user && !isBlock?<OrderSucessPage/>:isBlock?<BlockedPage/>:<Authentication/>}/>
            <Route path="/checkout" element={user&& !isBlock?<Checkout/>:isBlock?<BlockedPage/>:<Authentication/>}/>
            <Route path="/cart"  element={user && !isBlock?<Cart/>:isBlock?<BlockedPage/>:<Authentication/>}/>
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/otpForgetPassword" element={isBlock?<BlockedPage/>:<ForgetOtp />} />
            <Route path="/resetPass" element={isBlock?<BlockedPage/>:<ResetPassword />} />
            <Route path="/sucesPage" element={isBlock?<BlockedPage/>:<VerificationPage />} />
            <Route  path="/products" element={<Products/>}/>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
   
      {/* <VerificationPage/> */}
      {/* <ResetPassword/> */}
    </>
  );
}

export default App;
