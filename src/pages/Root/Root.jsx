import { Outlet } from "react-router-dom";
import LoadingProvider from "../../context/LoadingContext";

const Root = () => {
  return (
    <LoadingProvider>
      <Outlet />
    </LoadingProvider>
  );
};

export default Root;
