/* eslint-disable react/prop-types */
import { Add } from "@mui/icons-material";
import { Fade, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { concat } from "../../utils/renderers";
import { useNavigate } from "react-router-dom";

const MenuSectionGA = ({ basePath, menu, anchorEl, isOpen, onClose }) => {
  const navigate = useNavigate();

  const navigateTo = (e, path) => {
    e.stopPropagation();
    navigate(path)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Fade}
      className="standardized-menu"
      PopoverClasses={{
        paper: "menu-paper",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disablePortal={true}
      slotProps={{
        backdrop: {
          invisible: true,
        },
      }}
      MenuListProps={{
        style: { pointerEvents: "auto" },
      }}
      autoFocus={false}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      onClick={(e) => e.stopPropagation()}
    >
      {menu.options.map((option) => (
        <MenuItem
          key={option.allPath}
          onClick={(e) => navigateTo(e, concat([basePath, option.allPath]))}
          className="menu-option w-100"
        >
          <div className="w-100 d-flex justify-content-between align-items-center">
            <span>
              {option.label}
            </span>
            <Tooltip
              title={`Добави към ${option.label}`}
              placement="right"
              style={{ fontSize: 14 }}
            >
              <IconButton
                size="small"
                className="add-button"
                onClick={(e) => navigateTo(e, concat([basePath, option.addPath]))}
              >
                <Add fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuSectionGA;
