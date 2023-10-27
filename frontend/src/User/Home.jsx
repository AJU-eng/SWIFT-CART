import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import TopOffers from "./components/TopOffers";
import Category from "./components/Category";
import Products from "./components/products";
import AuthenticatedNavbar from "./components/Navbar/AuthenticatedNavbar";
// import './Home.css'
function Home() {
  return (
    <div >
      <AuthenticatedNavbar /> 
      <Banner />
      <TopOffers />
      <Category />
      <Products/>
    </div>
  );
}

export default Home;
