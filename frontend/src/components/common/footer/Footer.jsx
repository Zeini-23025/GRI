import React from "react";
import "./footer.css";

const Footer = () => {
  const handleContactRedirect = () => {
    window.location.href = "/contact"; // Redirige vers la page contact
  };
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Avez-vous des questions ?</h1>
              <p>Nous vous aidons à trouver le bien immobilier idéal pour vous.</p>
            </div>
            <button className="btn5" onClick={handleContactRedirect}>
              Contactez-nous
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          {/* Section Informations de Contact */}
          <div className="contact-info">
            <h3>Contactez-nous</h3>
            <ul>
              <li>Email : <a href="mailto:contact@ijari.com">contact@ijari.com</a></li>
              <li>Téléphone : <a href="tel:+221123456789">+222 36 21 25 85 </a></li>
            </ul>
          </div>

          {/* Section Liens */}
          <div className="links">
            <h3>Liens utiles</h3>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/about">À propos</a></li>
              <li><a href="/services">Catégories</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="legal">
        <span>© 2024 3aghari. Designed By Zz.</span>
      </div>
    </>
  );
};

export default Footer;
