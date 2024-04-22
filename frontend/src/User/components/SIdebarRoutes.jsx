import React from 'react'
import RootLayoutUser from './RootLayoutUser'
import { Outlet, Route, Routes } from "react-router";
import UserProfile from './UserProfile';
import Wishlist from './Wishlist';
import Orders from './Orders';
import AddressManagment from './AddressManagment';
import OrderDetails from './OrderDetails';
import ReturnModal from "../components/requestModal"
import WalletManagent from './WalletManagent';
import AddressModal from './AddressModal';
function SIdebarRoutes() {
  return (
    <RootLayoutUser>
      <Routes>
        <Route path="/">
          <Route index element={< UserProfile/>} />
          <Route path='wishlist' element={<Wishlist/>}/>
          <Route path='user' element={<UserProfile/>}/>
          <Route path='Orders' element={<Orders/>}/>
          <Route path='address' element={<AddressManagment/>}/>
          {/* <Route path='orderHistory' element={<OrderHistory/>}/> */}
          <Route path="/Orders/orderDetail/:id" element={<OrderDetails/>}/>
          <Route path='return' element={<ReturnModal/>}/>
          <Route path='wallet' element={<WalletManagent/>}/>
          <Route path='AddressModal' element={<AddressModal/>}/>
        </Route>

        
      </Routes>
    </RootLayoutUser>
  )
}

export default SIdebarRoutes