import { Outlet } from "react-router-dom";
import useAuth from "../../utils/hooks";
import Unauthorized from "../Errors/Unauthorized";
import { getCookie } from "../../utils/commonUtils";
import LoadingProvider from "../../context/LoadingContext";

const PrivateRoot = () => {
  const { isAuthenticated } = useAuth(getCookie("AccessToken"));

  if (!isAuthenticated) return <Unauthorized />;

  return (
    <LoadingProvider>
      <Outlet />
    </LoadingProvider>
  );
};

export default PrivateRoot;
