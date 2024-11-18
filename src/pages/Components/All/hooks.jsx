import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";
import { ComponentApi } from "../../../services/Component/Api";

const PAGE_SIZE = 10;

export const useHandlers = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoading(true);
  const [error, setError] = useState(null);
  const pageSize = PAGE_SIZE;
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    componentName: "",
    componentId: null,
  });

  const [orderByNameAscending, setOrderByNameAscending] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  
  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        pageSize,
        orderByNameAscending,
        search: search
      };

      const response = await ComponentApi.get().all(params);

      if (response.data) {
        const paginatedData = response.data;
        setComponents(paginatedData.items);
        setTotalPages(paginatedData.totalPages);
      }
    } catch {
      setError("Възникна грешка.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterReset = () => {
    setOrderByNameAscending(false);
    setCurrentPage(1);
  };

  const goToUpdateComponent = (id) => navigate(`/private/components/update/${id}`);
  const goToAddComponent = () => navigate(`/private/components/add`);
  const goToComponentInfo = (id) => navigate(`/private/components/info/${id}`);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await ComponentApi.get().delete(id);

      navigate(0);
    } catch (error) {
      setError("Възникна грешка.");
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchComponents();
  };

  return {
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
    search,
    setSearch,
    handleSearch,
  };
};
