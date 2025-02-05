import React from "react"
import { featured } from "../../data/Data"
import { useNavigate } from "react-router-dom"
import "./FeaturedCard.css"

const FeaturedCard = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryType) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    // if (!isAuthenticated) {
    //   // Redirection vers login avec défilement en haut
    //   navigate('/login');
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    //   });
    //   return;
    // }

    // Navigation vers la catégorie avec défilement en haut
    switch(categoryType) {
      case "Maison & Villa":
        navigate('/properties/maisons');
        break;
      case "Apartements":
        navigate('/properties/appartements');
        break;
      case "Boutiques":
        navigate('/properties/boutiques');
        break;
      default:
        navigate('/');
    }
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Changé de 'smooth' à 'instant'
    });
  };

  return (
    <>
      <div className='contenu grid5 mtop'>
        {featured.map((items, index) => (
          <div 
            className='boxi category-card' 
            key={index}
            onClick={() => handleCategoryClick(items.name)}
          >
            <img src={items.cover} alt={items.name} />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
