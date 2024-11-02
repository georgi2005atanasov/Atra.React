import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../utils/hooks";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import TopBarGA from "../../components/Dashboard/TopBarGA";
import MenuButtonGA from "../../components/Dashboard/MenuButtonGA";
import MenuSectionGA from "../../components/Dashboard/MenuSectionGA";
import { ClickAwayListener } from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();
  const [menuAnchors, setMenuAnchors] = useState({
    details: null,
    components: null,
    products: null,
  });

  const handleClickAway = () => {
    setMenuAnchors({
      details: null,
      components: null,
      products: null
    });
  };

  const handleMenuClick = (event, menuKey) => {
    setMenuAnchors((prev) => {
      const newAnchors = { details: null, components: null, products: null };
      newAnchors[menuKey] = prev[menuKey] ? null : event.currentTarget;
      return newAnchors;
    });
  };

  const handleMenuClose = () => {
    setMenuAnchors({ details: null, components: null, products: null });
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menus = {
    details: {
      title: "Детайли",
      items: [
        { path: "/details/glass", label: "Стъкла" },
        { path: "/details/metals", label: "Метали" },
        { path: "/details/fasteners", label: "Крепежи" },
        { path: "/details/conductors", label: "Проводници, клеми, накрайници" },
        { path: "/details/atra", label: "АТРА" },
        { path: "/details/others", label: "Други" },
      ],
    },
    components: {
      title: "Компоненти",
      items: [{ path: "/components/all", label: "Всички" }],
    },
    products: {
      title: "Крайни изделия",
      items: [
        { path: "/products/lighting", label: "Осветителни тела" },
        { path: "/products/led", label: "Професионални LED осветителни тела" },
        {
          path: "/products/electrical",
          label: "Електроинсталационни материали",
        },
        { path: "/products/explosion-proof", label: "Взривозащитени изделия" },
        { path: "/products/disinfection", label: "Дезинфекционни системи" },
      ],
    },
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container-fluid p-0 w-100">
        <TopBarGA setLoading={setLoading} setError={setError} />
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="menu-container bg-light py-3">
            <div className="container ">
              <div className="d-flex row flex-row justify-content-between">
                {Object.entries(menus).map(([key, menu]) => (
                  <div
                    key={key}
                    className="d-flex col-md-4 justify-content-center"
                  >
                    <MenuButtonGA
                      title={menu.title}
                      isOpen={Boolean(menuAnchors[key])}
                      onClick={(e) => handleMenuClick(e, key)}
                      menuKey={key}
                    />
                    <MenuSectionGA
                      menuKey={key}
                      menu={menu}
                      anchorEl={menuAnchors[key]}
                      isOpen={Boolean(menuAnchors[key])}
                      onClose={handleMenuClose}
                      onNavigate={handleNavigate}
                    />
                  </div>
                ))}
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
