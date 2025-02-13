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

// Dashboard imports
import DashboardLayout from "../../Dashboard/layouts/DashboardLayout";
import Dashboard from "../../Dashboard/pages/Dashboard";
import Profile from "../../Dashboard/pages/Profile";
import Settings from "../../Dashboard/pages/Settings";
import Revenue from "../../Dashboard/pages/Revenue";
import Transactions from "../../Dashboard/pages/Transactions";
import DemandForm from "../rent/demandForm";
import Demandes from "../../Dashboard/pages/Demandes";

// Tables imports
import ContratList from "../../Dashboard/components/Tables/ContratList";
import PaiementList from "../../Dashboard/components/Tables/PaiementList";
import TypeList from "../../Dashboard/components/Tables/TypeList";
import ImmobilierList from "../../Dashboard/components/Tables/ImmobilierList";

import UtilisateurList from "../../Dashboard/components/Tables/UtilisateurList";

// Forms imports
import ImmobilierForm from "../../Dashboard/components/Forms/ImmobilierForm";
import TypesForm from "../../Dashboard/components/Forms/typesForm";

const Pages = () => {
  return (
    <>

      <Router>
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Header />
                <Blog />
                <Footer />
              </>
            }
          />
          <Route
            path="/pricing"
            element={
              <>
                <Header />
                <Pricing />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <Signup />
                <Footer />
              </>
            }
          />

          {/* Dashboard Routes - Uses DashboardLayout with its own Navbar, Sidebar, and Footer */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="revenues" element={<Revenue />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="demandes" element={<Demandes />} />

            {/* Gestion des Tables Routes */}
            <Route path="gestion-des-tables">
              <Route path="contrat" element={<ContratList />} />
              <Route path="paiement" element={<PaiementList />} />
              <Route path="types" element={<TypeList />} />
              <Route path="types/create" element={<TypesForm />} />
              <Route path="types/edit/:id" element={<TypesForm />} />
              <Route path="immobilier" element={<ImmobilierList />} />
              <Route path="immobilier/create" element={<ImmobilierForm />} />
              <Route path="immobilier/edit/:id" element={<ImmobilierForm />} />

              <Route path="utilisateur" element={<UtilisateurList />} />
            </Route>
            
          </Route>
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
          {/* <Route path="/rent-form/:id" element={<RentForm />} />
           */}
          <Route path="demandes/:id" element={<DemandForm />} />


        </Routes>
      </Router>
    </>
  );
};

export default Pages;
