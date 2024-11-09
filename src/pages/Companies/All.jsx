import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CompaniesApi } from "../../services/Companies/Api";
import { useLoading } from "../../utils/hooks";
import { Add } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./All.css";
import TopBarGA from "../../components/Dashboard/TopBarGA";
import BackButtonGA from "../../components/Common/BackButtonGA";

const PAGE_SIZE = 500;
const All = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = PAGE_SIZE;
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    companyName: "",
  });
  const [error, setError] = useState(null);
  const { setLoading } = useLoading(true);

  const fetchCompanies = useCallback(async () => {
    setError(null); // Reset error state before fetching
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize,
      };
      const response = await CompaniesApi.get().all(params);

      setCompanies(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch {
      setError("Възникна грешка при зареждане на компаниите.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, setLoading]);

  const handleDelete = async (id) => {
    setError(null); // Reset error state before delete action
    try {
      await CompaniesApi.get().delete(id);
      setDeleteModal({
        isOpen: false,
        companyName: "",
      });
      navigate(0);
    } catch (error) {
      setError("Възникна грешка при изтриване на компанията.");
      console.error("Error deleting company:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, fetchCompanies]);

  const goToAddCompany = () => {
    navigate("/private/companies/add");
  };

  return (
    <div className="container-fluid p-0 m-0 vh-100">
      <TopBarGA setLoading={setLoading} setError={setError} />

      <div className="card shadow-sm">
        <div className="position-relative card-header bg-danger text-white text-center">
          <div className="position-absolute top-0">
            <BackButtonGA textColor="light" />
          </div>
          <h3 className="card-title mb-0">Компании</h3>
          <div onClick={goToAddCompany} className="company-form-header">
            <h5 className="mb-0">Добави</h5>
            <Add />
          </div>
        </div>

        <div className="card-body">
          {error ? (
            <div className="text-center">
              <Alert severity="error" className="mb-3">
                {error}
              </Alert>
              <Button variant="outlined" color="error" onClick={fetchCompanies}>
                Опитай отново
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              {companies.length === 0 ? (
                <h5 className="w-100 text-center mt-2">
                  Няма намерени компании
                </h5>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Име</th>
                      <th className="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.name}>
                        <td>{company.name}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  companyName: company.id,
                                })
                              }
                            >
                              <Trash2 size={16} />
                              Изтрий
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !error && (
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link border-danger text-danger"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Предишна
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className={`page-link ${
                        currentPage === index + 1
                          ? "bg-danger border-danger text-white"
                          : "border-danger text-danger"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-danger text-danger"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Следваща
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Потвърждение за изтриване</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setDeleteModal({ isOpen: false, companyName: "" })
                    }
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-0">
                    Сигурен ли сте че искате да изтриете '
                    {deleteModal.companyName}'?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setDeleteModal({ isOpen: false, companyName: "" })
                    }
                  >
                    Отказ
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(deleteModal.companyName)}
                  >
                    Изтрий
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default All;
