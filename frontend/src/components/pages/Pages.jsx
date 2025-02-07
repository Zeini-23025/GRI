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

// Dashboard imports
import DashboardLayout from "../../Dashboard/layouts/DashboardLayout";
import Dashboard from "../../Dashboard/pages/Dashboard";
import Profile from "../../Dashboard/pages/Profile";
import Settings from "../../Dashboard/pages/Settings";

// Tables imports
import ContratList from "../../Dashboard/components/Tables/ContratList";
import PaiementList from "../../Dashboard/components/Tables/PaiementList";
import TypeList from "../../Dashboard/components/Tables/TypeList";
import ImmobilierList from "../../Dashboard/components/Tables/ImmobilierList";
import UtilisateurList from "../../Dashboard/components/Tables/UtilisateurList";

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
            
            {/* Gestion des Tables Routes */}
            <Route path="gestion-des-tables">
              <Route path="contrat" element={<ContratList />} />
              <Route path="paiement" element={<PaiementList />} />
              <Route path="type" element={<TypeList />} />
              <Route path="immobilier" element={<ImmobilierList />} />
              <Route path="utilisateur" element={<UtilisateurList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Pages;
