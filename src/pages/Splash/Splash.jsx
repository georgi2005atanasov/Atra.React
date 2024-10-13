import { useEffect } from "react";
import Login from "../Login/Login.jsx";

const Splash = () => {
  useEffect(() => {}, []);
  
  console.log(window.secureStorage);
  
  return (
    <>
      <Login />
      {/* <Outlet /> */}
    </>
  );
};

export default Splash;
