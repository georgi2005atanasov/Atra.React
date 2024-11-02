import { KeyboardArrowDown } from "@mui/icons-material";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MenuButtonGA = ({ title, isOpen, onClick }) => (
  <Button
    color="inherit"
    onClick={onClick}
    className={`menu-button ${isOpen ? "active" : ""}`}
    endIcon={
      <KeyboardArrowDown className={`arrow-icon ${isOpen ? "rotated" : ""}`} />
    }
  >
    {title}
  </Button>
);

export default MenuButtonGA;
