import { Outlet } from "react-router-dom";
import useAuth from "../../utils/hooks";
import Storage from "../../utils/storage/Storage";
import Unauthorized from "../Errors/Unauthorized";

const PrivateRoot = () => {
  const { isAuthenticated } = useAuth(Storage.getAccessToken());

  if (!isAuthenticated) return <Unauthorized />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoot;
