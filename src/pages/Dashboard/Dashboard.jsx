import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdentityApi } from "../../services/Identity/Api";
import { useLoading } from "../../utils/hooks";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import "./Dashboard.css";
import Storage from "../../utils/storage/Storage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Добро утро, ";
    if (hour >= 12 && hour < 17) return "Добър ден, ";
    if (hour >= 17 && hour < 22) return "Добър вечер, ";
    return "Добър вечер, ";
  };

  const logout = async () => {
    try {
      setLoading(true);
      await IdentityApi.get().logout({
        email: Storage.getEmail(),
      });
      setLoading(false);
      navigate(`/login?email=${Storage.getEmail()}`, { replace: true });
    } catch (ex) {
      setError(ex.message);
      console.log(ex);
    }
  };

  // TODO: render error
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container-fluid p-0">
        {/* Header with search and logout */}
        <div className="row m-0 bg-white shadow-sm">
          <div className="col-12 px-4 py-3">
            {/* Greeting */}
            <h5 className="mb-3 text-muted text-center">
              {getGreeting()}&nbsp;{Storage.getUserName()}!
              {/* If you want to add user's name later:
                <span className="ms-1 text-dark">{userName}</span> */}
            </h5>

            <div className="d-flex justify-content-between align-items-center">
              {/* Search bar with icon */}
              <div className="position-relative d-flex align-items-center flex-grow-1 me-5">
                <input
                  type="text"
                  className="form-control ps-3 pe-5 bg-light dashboard-searchBar"
                  placeholder="Търсене..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  className="h-50 bi bi-search position-absolute end-0 me-3"
                  src={"../../src/assets/searchIcon.png"}
                />
              </div>

              {/* Exit button */}
              <img
                onClick={logout}
                className="position-absolute end-0 me-3 exit"
                src={"../../src/assets/exit.png"}
              />
            </div>
          </div>
        </div>

        {/* Rest of your dashboard content goes here */}
        <div className="row m-0">
          <div className="col-12 p-4">{/* Your dashboard content */}</div>
          {error && <h6 className="p-3 text-center text-danger">{error}</h6>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
