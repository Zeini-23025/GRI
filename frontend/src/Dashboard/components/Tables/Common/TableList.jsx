import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { apiServices } from '../../../../api';
import './TableList.css';



const TableList = ({ 
  title, 
  endpoint, 
  columns, 
  dataKey, 
  searchFields, 
  createPath,
  viewPath,
  transformData 
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/${endpoint}/`);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Erreur lors du chargement des ${title.toLowerCase()}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title]);

  const filteredData = data.filter(item =>
    searchFields.some(field =>
      String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // handleEdit = (item) => {
  // }

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;


const handleDelet = async (id) => {
  try {
    const response = await apiServices[endpoint].delete(id);
    if (response.status === 204) {
      setData(data.filter(item => item.id !== id));
      alert("Suppression réussie");
    } else {
      alert("Erreur lors de la suppression");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression");
  }
}
  

  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">{title}</h2>
        <div className="table-actions">
          <input
            type="text"
            className="search-table-input"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {(title !== "Paiements" && title !== "Contrats")  && (
            <Link to={createPath} className="create-button">
              Nouveau {title.slice(0, -1)}
            </Link>
          )}
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {transformData ? 
                        transformData(item, column.field) : 
                        item[column.field]}
                    </td>
                  ))}
                  <td>
                    <Link 
                      to={`${viewPath}/${item.id}`}
                      className="view-button"
                    >
                      Voir
                    </Link>
                    {(title !== "Paiements" )  && (

                    <Link to={`${createPath}/${item.id}`} className="create-button">
                      <span className="edit-btn"></span>
                      {title}
                    </Link>

                    ) && (
                      <button 
                      className="action-btn reject"
                      onClick={() => handleDelet(item.id)}
                      title="suprimer"
                    >
                    </button>
                    )}
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="no-data">
                    Aucun résultat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={`page-button ${page === i + 1 ? 'active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableList;