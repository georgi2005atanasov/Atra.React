import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import NavigationGA from "../../../components/Common/NavigationGA";
import TopBarGA from "../../../components/Dashboard/TopBarGA";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddButtonGA from "../../../components/Common/AddButtonGA";
import DeleteModal from "../../../components/Common/DeleteModal";
import ImageCell from "../../../components/Common/ImageCell";
import { PRODUCT_CATEGORY_LABELS } from "../Form/constants";
import { ProductsApi } from "../../../services/Product/Api";

const All = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoading(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderByNameAscending, setOrderByNameAscending] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productName: "",
    productId: null,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: search ? 1 : currentPage,
        pageSize: 10,
        category: category,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        orderByNameAscending,
        search,
      };

      const response = await ProductsApi.get().all(params);
      setProducts(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (ex) {
      console.log(ex);
      setError("Възникна грешка.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleFilterReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setOrderByNameAscending(false);
    setCurrentPage(1);
    setCategory("");
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await ProductsApi.get().delete(id);
      navigate(0);
    } catch (ex) {
      console.log(ex);
      setError("Възникна грешка.");
    } finally {
      setLoading(false);
    }
  };

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
          search={search}
          setSearch={setSearch}
          handleSearch={fetchProducts}
        />
        <NavigationGA />
        <div className="card p-0">
          <div className="row">
            <div className="col-md-3">
              <BackButtonGA />
            </div>
            <div className="col-md-6 card-header">
              <h3 className="card-title mb-0 text-center">Продукти</h3>
            </div>
            <div className="col-md-3 d-flex justify-content-md-end justify-content-center align-items-center">
              <AddButtonGA handler={() => navigate("/private/products/add")} />
            </div>
          </div>

          <div className="card-body bg-light border-bottom">
            <div className="row g-3">
              <div className="col-md-3">
                <FormControl fullWidth color="error">
                  <InputLabel>Категория</InputLabel>
                  <Select
                    value={category}
                    label="Категория"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Object.values(PRODUCT_CATEGORY_LABELS).map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-2">
                <TextField
                  fullWidth
                  label="Минимална цена"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <TextField
                  fullWidth
                  label="Максимална цена"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <FormControl fullWidth>
                  <InputLabel>Подреждане</InputLabel>
                  <Select
                    value={orderByNameAscending}
                    label="Подреждане"
                    onChange={(e) => setOrderByNameAscending(e.target.value)}
                  >
                    <MenuItem value={false}>По дата</MenuItem>
                    <MenuItem value={true}>По име (А-Я)</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-3 d-flex gap-2">
                <button
                  className="btn btn-secondary flex-grow-1"
                  onClick={fetchProducts}
                >
                  Търси
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={handleFilterReset}
                >
                  Изчисти
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {products.length === 0 ? (
                <h5 className="text-center mt-2">Няма намерени продукти</h5>
              ) : (
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Име</th>
                      <th>Категория</th>
                      <th>Цена труд</th>
                      <th>Цена без труд</th>
                      <th>Обща цена</th>
                      <th>Създаден на</th>
                      <th>Снимка</th>
                      <th className="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{PRODUCT_CATEGORY_LABELS[product.category]}</td>
                        <td>{product.labourPrice.toFixed(2)} лв.</td>
                        <td>{product.priceWithoutLabour.toFixed(2)} лв.</td>
                        <td>{product.totalPrice.toFixed(2)} лв.</td>
                        <td>{product.createdOn}</td>
                        <ImageCell
                          base64Image={product.image}
                          modalImage={product.modalImage}
                          name={product.name}
                        />
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => navigate(`/private/products/info/${product.id}`)}
                            >
                              Виж
                            </button>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => navigate(`/private/products/update/${product.id}`)}
                            >
                              Обнови
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  productName: product.name,
                                  productId: product.id,
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

            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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

export default All;