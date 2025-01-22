import React, { useEffect } from "react"; 
import "./Home.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer"; 

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animated");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    };

    
    window.addEventListener("scroll", handleScroll);

    
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <div className="container">
      {/* Header */}
      <Navbar/>
      <div className="home-container">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/videos/Vidéo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      <header className="header fade-in">
        <h1>Welcome to Darak.com</h1>
        <p>Find your perfect apartment with ease.</p>
      </header>

      {/* Search Section */}
      <section className="search-section slide-in">
        <h2>Search Apartments</h2>
        <input
          type="text"
          placeholder="Search by city, ZIP, or address"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </section>
      {/* <section>
        <h2 style={{ margin: '20px', textAlign: 'center' }}>Properties for you</h2>
        
      </section> */}
    </div>

      {/* Featured Section */}
      <section className="featured-section fade-in">
        <h2>Featured Listings</h2>
        <div className="card-container">
          {/* Example listing card */}
          <div className="card zoom-in">
            <h3>Luxury Apartment</h3>
            <img src="/videos/image33.jpeg" alt="Property 1" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>2 beds • 2 baths • $2,000/month</p>
            <button className="button">View Details</button>
          </div>
          <div className="card zoom-in">
            <h3>Downtown Studio</h3>
            <img src="/videos/image4.jpeg" alt="Property 2" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>1 bed • 1 bath • $1,500/month</p>
            <button className="button">View Details</button>
          </div>
          
          <div className="card zoom-in">
            <h3>Luxury Apartment</h3>
            <img src="/videos/image1.jpeg" alt="Property 1" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>2 beds • 2 baths • $2,000/month</p>
            <button className="button">View Details</button>
          </div>
          <div className="card zoom-in">
            <h3>Luxury Apartment</h3>
            <img src="/videos/image11.jpeg" alt="Property 1" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>2 beds • 2 baths • $2,000/month</p>
            <button className="button">View Details</button>
          </div>
          <div className="card zoom-in">
            <h3>Luxury Apartment</h3>
            <img src="/videos/image5.jpeg" alt="Property 1" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>2 beds • 2 baths • $2,000/month</p>
            <button className="button">View Details</button>
          </div>
          <div className="card zoom-in">
            <h3>Luxury Apartment</h3>
            <img src="/videos/image6.jpeg" alt="Property 1" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
            <p>2 beds • 2 baths • $2,000/month</p>
            <button className="button">View Details</button>
          </div>
          <section className="animated">
        <h2 className="section-title">Nos partenaires en Mauritanie</h2>
        <p className="section-paragraph">
         Darak collabore avec des partenaires de renom en Mauritanie pour vous garantir des services de qualité. 
          Grâce à notre réseau professionnel étendu, nous sommes en mesure de vous proposer des solutions immobilières 
          complètes et adaptées à vos besoins.
        </p>
      </section>

      <section className="animated">
        <h2 className="section-title">Des propriétés exclusives et haut de gamme à Nouakchott</h2>
        <p className="section-paragraph">
          Grâce à nos compétences en relations publiques et en immobilier, nous avons créé Darak, une agence innovante 
          et haut de gamme. Notre équipe d’experts, passionnés par l’immobilier, est déterminée à concrétiser vos projets. 
          Faites confiance à Darak et découvrez notre portefeuille exclusif de propriétés d’exception. Avec notre présence 
          active et notre connaissance approfondie du marché local, notre agence immobilière à Nouakchott est votre partenaire 
          de choix pour trouver la propriété idéale.
        </p>
      </section>

        </div>
      </section>
      <Footer />
    </div>
    
  );
}

export default Home;