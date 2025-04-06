import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './common/Form';
import { apiServices } from '../../../api';

const ImmobilierForm = () => {
  const { id } = useParams();
  const [types, setTypes] = useState([]);
  const [proprietaires, setProprietaires] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypesProprietaires = async () => {
      try {
        const response = await apiServices.types.list()
        setTypes(response.data);
        const responseProprietaires = await apiServices.utilisateurs.list();
        setProprietaires(responseProprietaires.data);
      } catch (err) {
        console.error('Erreur lors du chargement des types:', err);
      }

    };
    fetchTypesProprietaires();
  }, []);


  
  const fields = [
    { field: 'nom', label: 'Nom', type: 'text' },
    { field: 'adresse', label: 'Adresse', type: 'text' },
    { field: 'superficie', label: 'Superficie (m²)', type: 'number' },
    { field: 'montant', label: 'Montant (MRU)', type: 'number' },
    { field: 'image', label: 'Image', type: 'file' }, // Champ pour l'image
    { 
      field: 'id_type', 
      label: 'Type', 
      type: 'select',
      options: types.map(type => ({
        value: type.id,
        label: type.nom
      }))
    },
    { 
      field: 'id_proprietaire',
      label: 'Propriétaire',
      type: 'select', 
      options: proprietaires.map(type => ({
        value: type.id,
        label: type.username
      }))
    }
  ];

  const handleFormSubmit = (formData) => {
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Vérifiez que le fichier est bien ajouté
    if (formData.image instanceof File) {
      if (!["image/jpeg", "image/png"].includes(formData.image.type)) {
        setError("Le fichier doit être une image au format JPEG ou PNG.");
        return;
      }
      formDataToSend.append("image", formData.image);
    } else {
      setError("Veuillez sélectionner un fichier valide.");
      return;
    }

    console.log("FormData envoyé :", Array.from(formDataToSend.entries()));

    // Envoyer les données au backend
    apiServices.immobiliers.create(formDataToSend)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
      })
      .catch((err) => {
        setError("Erreur lors de l'enregistrement de l'immobilier");
        console.error("Erreur lors de l'envoi :", err.response?.data);
      });
  };

  return (
    <Form 
      fields={fields}
      endpoint="immobiliers"
      id={id}
      title="un immobilier"
      onSubmit={handleFormSubmit}
    />
  );
};

export default ImmobilierForm;