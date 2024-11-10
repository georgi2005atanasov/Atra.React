import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AddButtonGA = ({ handler, textColor = "secondary" }) => {
  return (
    <IconButton
      onClick={handler}
      className={`btn btn-light text-${textColor} d-flex justify-content-center align-items-center`}
      aria-label="Назад"
    >
      <span className="ms-2">Добави</span>
      <Add />
    </IconButton>
  );
};

export default AddButtonGA;
