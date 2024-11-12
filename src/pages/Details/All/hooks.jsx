import { useEffect, useState } from "react";
import { DetailsApi } from "../../../services/Detail/Api";
import { getCategoryKeyByValue } from "../Form/constants";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";

const PAGE_SIZE = 10;

export const useHandlers = () => {
  let { suppliers, category: passedCategory } = useLoaderData();
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
  const [category, setCategory] = useState(passedCategory || "");
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
        ...(minPrice && { minPrice: Number(minPrice) }),
        ...(maxPrice && { maxPrice: Number(maxPrice) }),
        ...(category && { category: getCategoryKeyByValue(category) }),
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
  }, [currentPage, category]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterReset = () => {
    setSupplierId("");
    setMinPrice("");
    setMaxPrice("");
    setOrderByNameAscending(false);
    setCurrentPage(1);
    setCategory("");
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  const goToUpdateDetail = (id) => navigate(`/private/details/update/${id}`);
  const goToAddDetail = () => navigate(`/private/details/add`);
  const goToDetailInfo = (id) => navigate(`/private/details/info/${id}`);

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

  return {
    suppliers,
    details,
    supplierId,
    setSupplierId,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
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
    goToAddDetail,
    goToUpdateDetail,
    goToDetailInfo,
    handleCategoryChange,
    handleDelete,
    fetchDetails,
  };
};
