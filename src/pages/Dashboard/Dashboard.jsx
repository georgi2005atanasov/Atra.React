import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdentityApi } from "../../services/Identity/Api";
import { useLoading } from "../../utils/hooks";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import "./Dashboard.css";
import Storage from "../../utils/storage/Storage";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Search } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Добро утро,";
    if (hour >= 12 && hour < 17) return "Добър ден,";
    if (hour >= 17 && hour < 22) return "Добър вечер,";
    return "Добър вечер,";
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

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(1);
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container-fluid p-0 w-100">
        <div className="row m-0 bg-white shadow-sm w-100">
          <div className="col-12 w-100 px-4 py-3">
            {/* Greeting */}
            <h5 className="mb-3 text-muted">
              {getGreeting()}&nbsp;{Storage.getUserName()}!&nbsp;Какво Ви интересува?
            </h5>

            <div className="d-flex justify-content-between align-items-center">
              <div className="position-relative d-flex align-items-center flex-grow-1 me-5">
                <form onSubmit={handleSearch} className="w-100">
                  <FormControl variant="outlined" fullWidth color="error">
                    <InputLabel htmlFor="outlined-search">Search</InputLabel>
                    <OutlinedInput
                      id="outlined-search"
                      type="text"
                      label="Search"
                      value={searchQuery}
                      onSubmit={handleSearch}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleSearch} edge="end">
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </form>
              </div>
              <img
                onClick={logout}
                className="position-absolute end-0 me-3 exit"
                src={"../../src/assets/exit.png"}
              />
            </div>
          </div>
        </div>

        <div className="row m-0">
          <div className="col-12 p-4">{/* Your dashboard content */}</div>
          {error && <h6 className="p-3 text-center text-danger">{error}</h6>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
