import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BackButtonGA = ({ textColor = "secondary" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleBack}
      className={`btn btn-light text-${textColor} d-flex justify-content-center align-items-center`}
      aria-label="Назад"
    >
      <ArrowBackIcon />
      <span className="ms-2">Назад</span>
    </IconButton>
  );
};

export default BackButtonGA;
