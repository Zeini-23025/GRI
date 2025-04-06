import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "./common/Form";
import { apiServices } from "../../../api";

const ContratForm = () => {
  const { id } = useParams();
  const [immobiliers, setImmobiliers] = useState([]);
  const [locataires, setLocataires] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des immobiliers
        const responseImmobiliers = await apiServices.immobiliers.list();
        setImmobiliers(responseImmobiliers.data);

        // Récupération des locataires (utilisateurs)
        const responseLocataires = await apiServices.utilisateurs.list();
        setLocataires(responseLocataires.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    };

    fetchData();
  }, []);

  const fields = [
    {
      field: "id_immobilier",
      label: "Immobilier",
      type: "select",
      options: immobiliers.map((immobilier) => ({
        value: immobilier.id,
        label: immobilier.nom,
      })),
    },
    {
      field: "id_locataire",
      label: "Locataire",
      type: "select",
      options: locataires.map((locataire) => ({
        value: locataire.id,
        label: locataire.username,
      })),
    },
    { field: "date_debut", label: "Date de début", type: "date" },
    { field: "date_fin", label: "Date de fin", type: "date" },
    { field: "montant", label: "Montant (MRU)", type: "number" },
    { field: "url_document", label: "URL du document", type: "text" },
  ];

  return (
    <Form
      fields={fields}
      endpoint="contrats"
      id={id}
      title="un contrat"
    />
  );
};

export default ContratForm;
