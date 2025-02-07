import React from 'react';
import TableList from './Common/TableList';

const ContratList = () => {
  const columns = [
    { field: 'id_immobilier', header: 'ID Immobilier' },
    { field: 'id_locataire', header: 'ID Locataire' },
    { field: 'date_debut', header: 'Date Début' },
    { field: 'date_fin', header: 'Date Fin' },
    { field: 'montant', header: 'Montant' },
  ];

  const transformData = (item, field) => {
    if (field === 'montant') return `${item[field]} MRU`;
    return item[field];
  };

  return (
    <TableList
      title="Contrats"
      endpoint="contrats"
      columns={columns}
      dataKey="contrat"
      searchFields={['id_immobilier', 'id_locataire', 'montant']}
      createPath="/dashboard/gestion-des-tables/contrat/create"
      viewPath="/dashboard/gestion-des-tables/contrat"
      transformData={transformData}
    />
  );
};

export default ContratList; 