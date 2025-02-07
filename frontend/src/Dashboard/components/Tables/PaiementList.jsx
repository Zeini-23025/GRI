import React from 'react';
import TableList from './Common/TableList';

const PaiementList = () => {
  const columns = [
    { field: 'id_contrat', header: 'ID Contrat' },
    { field: 'id_mois', header: 'ID Mois' },
    { field: 'montant', header: 'Montant' },
    { field: 'date_paiement', header: 'Date Paiement' },
    { field: 'methode_paiement', header: 'Méthode' },
    { field: 'statut', header: 'Statut' },
  ];

  const transformData = (item, field) => {
    if (field === 'montant') return `${item[field]} MRU`;
    return item[field];
  };

  return (
    <TableList
      title="Paiements"
      endpoint="paiements"
      columns={columns}
      dataKey="paiement"
      searchFields={['methode_paiement', 'statut']}
      createPath="/dashboard/gestion-des-tables/paiement/create"
      viewPath="/dashboard/gestion-des-tables/paiement"
      transformData={transformData}
    />
  );
};

export default PaiementList; 