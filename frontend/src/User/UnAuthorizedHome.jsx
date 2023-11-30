import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner'
import TopOffers from './components/TopOffers'
import Category from './components/Category'
import Products from "./components/products"
import Footer from './components/footer'

function UnAuthorizedHome() {
  return (
    <div>
       <Navbar/>
        <Banner/>
        <TopOffers/>
        <Category/>
        <Products/>
        {/* <Footer/> */}
    </div>
  )
}

export default UnAuthorizedHome