import { useState } from "react";
import { IdentityApi } from "../../services/Identity/Api";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Storage from "../../utils/storage/Storage";

// eslint-disable-next-line react/prop-types
const TopBarGA = ({ setLoading, setError }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
      // TODO: UtilsApi to handle errors
      setError(ex.message);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="row m-0 bg-white shadow-sm w-100">
        <div className="col-12 w-100 px-4 py-3">
          {/* Greeting */}
          <h4 className="mb-3 text-muted">
            {getGreeting()}&nbsp;{Storage.getUserName()}!&nbsp;Какво Ви
            интересува?
          </h4>

          <div className="d-flex justify-content-between align-items-center">
            <div className="position-relative d-flex align-items-center flex-grow-1 me-5">
              <form onSubmit={handleSearch} className="w-100">
                <FormControl variant="outlined" fullWidth color="error">
                  <InputLabel htmlFor="outlined-search">Търсене</InputLabel>
                  <OutlinedInput
                    id="outlined-search"
                    type="text"
                    label="Търсене"
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
    </>
  );
};

export default TopBarGA;
