import { useEffect } from "react";
import { Outlet, useSubmit } from "react-router-dom";

const Splash = () => {
  const submit = useSubmit();

  useEffect(() => {
    submit(null, { action: "onboarding", method: "get" });
  }, [submit]);

  console.log(window.secureStorage);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Splash;
