import { Button, ClickAwayListener } from "@mui/material";
import MenuButtonGA from "../Dashboard/MenuButtonGA";
import MenuSectionGA from "../Dashboard/MenuSectionGA";
import { useHandlers } from "../../pages/Dashboard/hooks";
import { useNavigate } from "react-router-dom";

const NavigationGA = () => {
    const navigate = useNavigate();

    // hooks from dashboard
    const {
      menuAnchors,
      handleClickAway,
      handleMenuClick,
      handleMenuClose,
      menus,
    } = useHandlers();

    return <ClickAwayListener onClickAway={handleClickAway}>
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
}

export default NavigationGA;