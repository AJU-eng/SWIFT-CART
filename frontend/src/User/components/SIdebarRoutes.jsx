import React from 'react'
import RootLayoutUser from './RootLayoutUser'
import { Outlet, Route, Routes } from "react-router";
import UserProfile from './userProfile';
import Wishlist from './Wishlist';
import Orders from './Orders';
import AddressManagment from './AddressManagment';

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
        </Route>

        
      </Routes>
    </RootLayoutUser>
  )
}

export default SIdebarRoutes