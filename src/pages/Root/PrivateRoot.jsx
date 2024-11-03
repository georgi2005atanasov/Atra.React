import { Outlet } from "react-router-dom";

const PrivateRoot = () => {
  // const { isAuthenticated } = useAuth(Storage.getAccessToken());

  // if (!isAuthenticated) return <Unauthorized />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoot;
