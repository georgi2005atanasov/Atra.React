import { Outlet } from "react-router-dom";

const PrivateRoot = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoot;