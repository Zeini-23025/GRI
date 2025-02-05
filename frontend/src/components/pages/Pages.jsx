import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
// import Login from "../login/Login";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import HousesList from "../properties/HousesList";  
import ApartmentsList from "../properties/ApartmentsList";
import ShopsList from "../properties/ShopsList";
import RentForm from "../rent/RentForm";
import FilteredProperties from "../home/featured/FilteredProperties";

const Pages = () => {
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties/:typeName" element={<FilteredProperties />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties/maisons" element={<HousesList />} />
          <Route path="/properties/appartements" element={<ApartmentsList />} />
          <Route path="/properties/boutiques" element={<ShopsList />} />
          <Route path="/rent-form/:id" element={<RentForm />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
