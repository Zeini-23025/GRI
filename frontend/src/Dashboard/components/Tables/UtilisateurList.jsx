import React from 'react';
import TableList from './Common/TableList';
import { apiServices } from '../../../api';

const UtilisateurList = () => {
  const columns = [
    { field: 'username', header: 'Nom d\'utilisateur' },
    { field: 'email', header: 'Email' },
    { field: 'first_name', header: 'Prénom' },
    { field: 'last_name', header: 'Nom' },
    { field: 'telephone', header: 'Téléphone' },
    { field: 'role', header: 'Rôle' }
  ];

  const transformData = (item, field) => {
    switch (field) {
      case 'role':
        return item[field] === 'client' ? 'Client' : 'Fournisseur';
      case 'telephone':
        return item[field] || 'Non spécifié';
      case 'first_name':
      case 'last_name':
        return item[field] || 'Non spécifié';
      case 'email':
        return item[field] || 'Non spécifié';
      case 'username':
        return item[field] || 'Non spécifié';
      default:
        return item[field];
    }
  };

  return (
    <TableList
      title="Utilisateurs"
      endpoint="users"
      columns={columns}
      dataKey="users"
      searchFields={['username', 'email', 'first_name', 'last_name', 'role']}
      createPath="/dashboard/gestion-des-tables/utilisateur/create"
      viewPath="/dashboard/gestion-des-tables/utilisateur"
      transformData={transformData}
    />
  );
};

export default UtilisateurList; 