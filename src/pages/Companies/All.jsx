import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CompaniesApi } from "../../services/Companies/Api";
import { useLoading } from "../../utils/hooks";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./All.css";
import TopBarGA from "../../components/Dashboard/TopBarGA";
import BackButtonGA from "../../components/Common/BackButtonGA";
import AddButtonGA from "../../components/Common/AddButtonGA";
import DeleteModal from "../../components/Companies/DeleteModal";
import { useHandlers } from "./hooks";

const All = () => {
  const {
    deleteModal,
    setDeleteModal,
    handleDelete,
    setLoading,
    error,
    setError,
    goToAddCompany,
    fetchCompanies,
    companies,
    totalPages,
    currentPage,
    handlePageChange,
  } = useHandlers();

  return (
    <>
      {deleteModal.isOpen && (
        <DeleteModal
          deleteModal={deleteModal}
          handleDelete={handleDelete}
          setDeleteModal={setDeleteModal}
        />
      )}

      <div className="container-fluid p-0 m-0 vh-100">
        <TopBarGA setLoading={setLoading} setError={setError} />

        <div className="card shadow-sm">
          <div className="row">
            <div className="col-md-3">
              <BackButtonGA />
            </div>
            <div className="col-md-6 card-header">
              <h3 className="card-title mb-0 text-center">Компании</h3>
            </div>
            <div className="col-md-3 d-flex justify-content-md-end justify-content-center align-items-center">
              <AddButtonGA handler={goToAddCompany} />
            </div>
          </div>

          <div className="card-body">
            {error ? (
              <div className="text-center">
                <Alert severity="error" className="mb-3">
                  {error}
                </Alert>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={fetchCompanies}
                >
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
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
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
      </div>
    </>
  );
};

export default All;
