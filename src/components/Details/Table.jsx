import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DetailsApi } from '../../services/Detail/Api';

const Table = () => {
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const fetchDetails = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await DetailsApi.get().all({
        page,
        pageSize,
      })
      
      if (response.data) {
        const paginatedData = response.data.paginatedDetails;
        console.log(paginatedData);
        
        setDetails(paginatedData.items);
        setTotalPages(paginatedData.totalPages);
      }
    } catch (error) {
      setError('Error fetching details. Please try again later.');
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid my-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title mb-0 text-center">Детайли</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Име</th>
                  <th>Номер на детайл</th>
                  <th>АТРА номер</th>
                  <th>Достaвчик</th>
                  <th>Цена за труд</th>
                  <th>Добавен на</th>
                </tr>
              </thead>
              <tbody>
                {details.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">Няма намерени детайли</td>
                  </tr>
                ) : (
                  details.map((detail) => (
                    <tr key={detail.id}>
                      <td>{detail.name}</td>
                      <td>{detail.detailNumber}</td>
                      <td>{detail.atraNumber}</td>
                      <td>{detail.supplierName || '-'}</td>
                      <td>{detail.labourPrice?.toFixed(2) || '-'}</td>
                      <td>{detail.createdOn || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link text-danger"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Предишна
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, index) => (
                <li 
                  key={index + 1} 
                  className={`page-item text-danger ${currentPage === index + 1 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link text-danger"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item text-danger ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link text-danger"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Следваща
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Table;