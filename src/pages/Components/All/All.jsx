import ImageCell from "../../../components/Common/ImageCell";
import "./All.css";
import TopBarGA from "../../../components/Dashboard/TopBarGA";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import AddButtonGA from "../../../components/Common/AddButtonGA";
import DeleteModal from "../../../components/Common/DeleteModal";
import { useHandlers } from "./hooks";
import Unauthorized from "../../Errors/Unauthorized";

const All = () => {
  const {
    components,
    orderByNameAscending,
    setOrderByNameAscending,
    currentPage,
    totalPages,
    error,
    setError,
    setLoading,
    deleteModal,
    setDeleteModal,
    handlePageChange,
    handleFilterReset,
    goToAddComponent,
    goToUpdateComponent,
    goToComponentInfo,
    handleDelete,
    fetchComponents,
    handleSearch,
  } = useHandlers();

  if (error)
    return <Unauthorized />;

  return (
    <>
      {deleteModal.isOpen && (
        <DeleteModal
          deleteModal={deleteModal}
          handleDelete={handleDelete}
          setDeleteModal={setDeleteModal}
        />
      )}

      <div className="container-fluid m-0 p-0">
        <TopBarGA
          setLoading={setLoading}
          setError={setError}
          handleSearch={handleSearch}
        />
        <div className="card p-0">
          <div className="row">
            <div className="col-md-3">
              <BackButtonGA />
            </div>
            <div className="col-md-6 card-header">
              <h3 className="card-title mb-0 text-center">Компоненти</h3>
            </div>
            <div className="col-md-3 d-flex justify-content-md-end justify-content-center align-items-center">
              <AddButtonGA handler={goToAddComponent} />
            </div>
          </div>

          <div className="card-body bg-light border-bottom">
            <div className="row g-3 d-flex justify-content-end align-items-center">
              <div className="col-xl-2 mt-3">
                <select
                  className="form-select p-3"
                  value={orderByNameAscending.toString()}
                  onChange={(e) =>
                    setOrderByNameAscending(e.target.value === "true")
                  }
                >
                  <option value="false">По дата</option>
                  <option value="true">По име (А-Я)</option>
                </select>
              </div>

              <div className="col-xl-1 d-flex align-items-end">
                <button
                  className="btn btn-secondary w-100 p-3"
                  onClick={fetchComponents}
                >
                  Търси
                </button>
              </div>
              <div className="col-xl-1 d-flex align-items-end">
                <button
                  className="btn btn-danger w-100 p-3"
                  onClick={handleFilterReset}
                >
                  Изчисти
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {components.length === 0 ? (
                <h5 className="w-100 text-center mt-2">
                  Няма намерени детайли
                </h5>
              ) : (
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Име</th>
                      <th>Цена за труд</th>
                      <th>Цена без труд</th>
                      <th>Добавен на</th>
                      <th>Снимка</th>
                      <th className="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component) => (
                      <tr key={component.id}>
                        <td>{component.name || "-"}</td>
                        <td>
                          {component.labourPrice?.toFixed(2)
                            ? component.labourPrice?.toFixed(2) + "лв."
                            : "-"}
                        </td>
                        <td>
                          {component.priceWithoutLabour?.toFixed(2)
                            ? component.priceWithoutLabour?.toFixed(2) + "лв."
                            : "-"}
                        </td>
                        <td>{component.createdOn || "-"}</td>
                        <ImageCell
                          base64Image={component.image}
                          modalImage={component.image}
                          name={component.name}
                        />
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-primary btn-sm px-3 py-2"
                              onClick={() => goToComponentInfo(component.id)}
                            >
                              Виж
                            </button>
                            <button
                              className="btn btn-warning btn-sm px-3 py-2"
                              onClick={() => goToUpdateComponent(component.id)}
                            >
                              Обнови
                            </button>
                            <button
                              className="btn btn-danger btn-sm px-3 py-2"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  detailName: component.name,
                                  detailId: component.id,
                                })
                              }
                            >
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
                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                      }`}
                  >
                    <button
                      className={`page-link ${currentPage === index + 1
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
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
          </div>
        </div>
      </div>
    </>
  );
};

export default All;
