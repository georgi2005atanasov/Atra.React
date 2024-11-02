/* eslint-disable react/prop-types */
import { Fade, Menu, MenuItem } from "@mui/material";

const MenuSectionGA = ({ menu, anchorEl, isOpen, onClose, onNavigate }) => (
  <Menu
    anchorEl={anchorEl}
    open={isOpen}
    onClose={onClose}
    TransitionComponent={Fade}
    className="standardized-menu"
    PopoverClasses={{
      paper: 'menu-paper'
    }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    // Add these props to fix interaction
    disablePortal={true}
    slotProps={{
      backdrop: {
        invisible: true,
      }
    }}
    MenuListProps={{
      style: { pointerEvents: 'auto' }
    }}
  >
    {menu.items.map((item) => (
      <MenuItem
        key={item.path}
        onClick={() => onNavigate(item.path)}
        className="menu-item"
      >
        {item.label}
      </MenuItem>
    ))}
  </Menu>
);

export default MenuSectionGA;