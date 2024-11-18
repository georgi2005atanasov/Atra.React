import { useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import TopBarGA from "../../components/Dashboard/TopBarGA";
import NavigationGA from "../../components/Common/NavigationGA";
import "./Dashboard.css";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

  return (
    <>
      <div className="container-fluid p-0 w-100">
        <TopBarGA setLoading={setLoading} setError={setError} />
        <NavigationGA />
        {error && <h6 className="p-3 text-center text-danger">{error}</h6>}
      </div>
    </>
  );
};

export default Dashboard;
