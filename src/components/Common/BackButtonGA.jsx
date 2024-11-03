import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButtonGA = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton 
      onClick={handleBack} 
      className="btn btn-light text-secondary" 
      aria-label="Назад"
    >
      <ArrowBackIcon />
      <span className="ms-2">Назад</span>
    </IconButton>
  );
};

export default BackButtonGA;