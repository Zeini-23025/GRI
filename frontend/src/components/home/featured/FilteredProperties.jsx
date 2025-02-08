import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { list } from "../../data/Data";

const FilteredProperties = () => {
  const { typeName } = useParams(); // Récupère la catégorie depuis l'URL
  const [filteredList, setFilteredList] = useState([]); // État pour les propriétés filtrées

  useEffect(() => {
    // Filtrer les propriétés en fonction du type sélectionné
    let filtered;

    if (typeName === "Maison & Villa") {
      // Inclure les types associés (Maison ou Villa)
      filtered = list.filter(
        (property) =>
          property.type.toLowerCase() === "maison" ||
          property.type.toLowerCase() === "villa"
      );
    } else {
      // Filtrer par catégorie exacte
      filtered = list.filter((property) =>
        property.type.toLowerCase().includes(typeName.toLowerCase())
      );
    }

    setFilteredList(filtered); // Met à jour la liste des propriétés filtrées
  }, [typeName]);

  return (
    <div className="filtered-properties">
      <h1>Immobiliers pour : {typeName}</h1>
      <div className="grid5">
        {filteredList.length > 0 ? (
          filteredList.map((property) => (
            <div key={property.id} className="boxi">
              <img src={property.cover} alt={property.name} />
              <h4>{property.name}</h4>
              <p>Adresse : {property.location}</p>
              <p>Catégorie : {property.category}</p>
              <p>Prix : {property.price} €</p>
            </div>
          ))
        ) : (
          <p>Aucun immobilier trouvé pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredProperties;
