import React from "react";
import { Link } from "react-router-dom";
import { featured } from "../../data/Data";

const FeaturedCard = () => {
  return (
    <div className="contenu grid5 mtop">
      {featured.map((items, index) => (
        <Link to={`/properties/${items.name}`} key={index} className="boxi">
          <img src={items.cover} alt={items.name} />
          <h4>{items.name}</h4>
          <label>{items.total}</label>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCard;
