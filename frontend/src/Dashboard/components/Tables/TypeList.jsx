import React from 'react';
import TableList from './Common/TableList';

const TypeList = () => {
  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'nom', header: 'Nom' },
    { field: 'description', header: 'Description' },
  ];

  return (
    <TableList
      title="Types"
      endpoint="types"
      columns={columns}
      dataKey="type"
      searchFields={['nom', 'description']}
      createPath="/dashboard/gestion-des-tables/type/create"
      viewPath="/dashboard/gestion-des-tables/type"
    />
  );
};

export default TypeList; 