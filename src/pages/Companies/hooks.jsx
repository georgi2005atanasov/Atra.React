import { useCallback, useEffect, useState } from "react";
import { CompaniesApi } from "../../services/Companies/Api";
import { useLoading } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 500;
export const useHandlers = () => {
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

  return {
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
  };
}