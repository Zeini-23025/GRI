import React from 'react';
import TableList from './Common/TableList';

const UtilisateurList = () => {
  const columns = [
    { field: 'username', header: 'Nom d\'utilisateur' },
    { field: 'email', header: 'Email' },
    { field: 'first_name', header: 'Prénom' },
    { field: 'last_name', header: 'Nom' },
    { field: 'telephone', header: 'Téléphone' },
    { field: 'role', header: 'Rôle' },
  ];

  const transformData = (item, field) => {
    if (field === 'role') {
      return item[field] === 'client' ? 'Client' : 'Fournisseur';
    }
    return item[field];
  };

  return (
    <TableList
      title="Utilisateurs"
      endpoint="utilisateurs"
      columns={columns}
      dataKey="user"
      searchFields={['username', 'email', 'first_name', 'last_name', 'role']}
      createPath="/dashboard/gestion-des-tables/utilisateur/create"
      viewPath="/dashboard/gestion-des-tables/utilisateur"
      transformData={transformData}
    />
  );
};

export default UtilisateurList; 