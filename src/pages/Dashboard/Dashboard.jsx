import { useState } from "react";
import { useLoading } from "../../utils/hooks";
import { Button, ClickAwayListener } from "@mui/material";
import { useHandlers } from "./hooks";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import TopBarGA from "../../components/Dashboard/TopBarGA";
import MenuButtonGA from "../../components/Dashboard/MenuButtonGA";
import MenuSectionGA from "../../components/Dashboard/MenuSectionGA";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();
  const {
    menuAnchors,
    handleClickAway,
    handleMenuClick,
    handleMenuClose,
    menus,
  } = useHandlers();

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container-fluid p-0 w-100">
        <TopBarGA setLoading={setLoading} setError={setError} />
        {/* Menu */}
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="menu-container bg-light py-3">
            <div className="container ">
              <div className="d-flex row flex-row justify-content-between">
                {Object.entries(menus).map(([key, menu]) => (
                  <div
                    key={key}
                    className="d-flex col-md-3 justify-content-center"
                  >
                    <MenuButtonGA
                      title={menu.title}
                      isOpen={Boolean(menuAnchors[key])}
                      onClick={(e) => handleMenuClick(e, key)}
                    />
                    <MenuSectionGA
                      basePath={menu.basePath}
                      menu={menu}
                      anchorEl={menuAnchors[key]}
                      isOpen={Boolean(menuAnchors[key])}
                      onClose={handleMenuClose}
                    />
                  </div>
                ))}
                <div
                  className="d-flex col-md-3 justify-content-center"
                >
                  <Button
                    color="inherit"
                    onClick={() => navigate("/private/companies/all")}
                    className={`menu-button`}
                  >
                    Компании
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
        {/* Error Display */}
        {error && <h6 className="p-3 text-center text-danger">{error}</h6>}
      </div>
    </>
  );
};

export default Dashboard;
