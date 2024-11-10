import { useState, useEffect } from "react";
import { DetailsApi } from "../../../services/Detail/Api";
import { useLoading } from "../../../utils/hooks";
import ImageCell from "../../../components/Common/ImageCell";
import "./All.css";
import TopBarGA from "../../../components/Dashboard/TopBarGA";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { CompaniesApi } from "../../../services/Companies/Api";
import { Autocomplete, TextField } from "@mui/material";
import AddButtonGA from "../../../components/Common/AddButtonGA";
import DeleteModal from "../../../components/Details/DeleteModal";

const PAGE_SIZE = 10;

const All = () => {
  let { suppliers } = useLoaderData();
  suppliers = [{ id: null, name: "Всички" }, ...suppliers];

  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoading(true);
  const [error, setError] = useState(null);
  const pageSize = PAGE_SIZE;
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    detailName: "",
    detailId: null,
  });

  const [supplierId, setSupplierId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderByNameAscending, setOrderByNameAscending] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        pageSize,
        ...(supplierId && { supplierId: parseInt(supplierId) }),
        ...(minPrice && { minPrice: parseFloat(minPrice) }),
        ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
        orderByNameAscending,
      };

      const response = await DetailsApi.get().all(params);

      if (response.data) {
        const paginatedData = response.data.paginatedDetails;
        setDetails(paginatedData.items);
        setTotalPages(paginatedData.totalPages);
      }
    } catch (error) {
      setError("Възникна грешка.");
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterReset = () => {
    setSupplierId("");
    setMinPrice("");
    setMaxPrice("");
    setOrderByNameAscending(false);
    setCurrentPage(1);
  };

  const goToUpdateDetail = (id) => {
    navigate(`/private/details/update/${id}`);
  };

  const goToAddDetail = () => {
    navigate(`/private/details/add`);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await DetailsApi.get().delete(id);
      
      navigate(0);
    } catch (error) {
      setError("Възникна грешка.");
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="alert alert-danger m-0" role="alert">
        {error}
      </div>
    );
  }

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
        <TopBarGA setLoading={setLoading} setError={setError} />
        <div className="card p-0">
          <div className="row">
            <div className="col-md-3">
              <BackButtonGA />
            </div>
            <div className="col-md-6 card-header">
              <h3 className="card-title mb-0 text-center">Детайли</h3>
            </div>
            <div className="col-md-3 d-flex justify-content-md-end justify-content-center align-items-center">
              <AddButtonGA handler={goToAddDetail} />
            </div>
          </div>

          <div className="card-body bg-light border-bottom">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Доставчик</label>
                <Autocomplete
                  options={suppliers}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    supplierId
                      ? suppliers.find((supplier) => supplier.id === supplierId)
                      : null
                  }
                  onChange={(event, newValue) => {
                    setSupplierId(newValue ? newValue.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Всички"
                      variant="outlined"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Минимална цена</label>
                <input
                  type="number"
                  className="form-control p-3"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Мин. цена"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Максимална цена</label>
                <input
                  type="number"
                  className="form-control p-3"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Макс. цена"
                />
              </div>

              <div className="col-lg-1">
                <label className="form-label">Подреждане</label>
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
                  onClick={fetchDetails}
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
              {details.length === 0 ? (
                <h5 className="w-100 text-center mt-2">
                  Няма намерени детайли
                </h5>
              ) : (
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Име</th>
                      <th>Номер на детайл</th>
                      <th>АТРА номер</th>
                      <th>Доставчик</th>
                      <th>Цена за труд</th>
                      <th>Добавен на</th>
                      <th>Снимка</th>
                      <th className="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail) => (
                      <tr key={detail.id}>
                        <td>{detail.name || "-"}</td>
                        <td>{detail.detailNumber || "-"}</td>
                        <td>{detail.atraNumber || "-"}</td>
                        <td>{detail.supplierName || "-"}</td>
                        <td>{detail.labourPrice?.toFixed(2) || "-"}</td>
                        <td>{detail.createdOn || "-"}</td>
                        <ImageCell
                          base64Image={detail.image}
                          modalImage={detail.modalImage}
                          name={detail.name}
                        />
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-primary btn-sm px-3 py-2"
                              onClick={() => goToUpdateDetail(detail.id)}
                            >
                              Виж
                            </button>
                            <button
                              className="btn btn-warning btn-sm px-3 py-2"
                              onClick={() => goToUpdateDetail(detail.id)}
                            >
                              Обнови
                            </button>
                            <button
                              className="btn btn-danger btn-sm px-3 py-2"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  detailName: detail.name,
                                  detailId: detail.id,
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
          </div>
        </div>
      </div>
    </>
  );
};

export async function loader({ request }) {
  try {
    // const url = new URL(request.url);
    // const category = url.searchParams.get("category");
    const response = await CompaniesApi.get().all();

    return {
      // category,
      suppliers: response.data.items,
    };
  } catch {
    return redirect("/");
  }
}

export default All;
