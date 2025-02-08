import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './common/Form';
import { apiServices } from '../../../api';

const ImmobilierForm = () => {
  const { id } = useParams();
  const [types, setTypes] = useState([]);
  const [proprietaires, setProprietaires] = useState([]);

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


  return (
    <Form 
      fields={fields}
      endpoint="immobilier"
      id={id}
      title="un immobilier"
    />
  );
};

export default ImmobilierForm; 