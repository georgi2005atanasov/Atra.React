import { NavLink } from "react-router-dom";
import "./AuthNavigation.css";

const AuthNavigation = () => {
  return (
    <nav className="navbar navbar-light bg-light mt-2 p-0">
      <div className="container-fluid w-100 d-flex justify-content-center p-0">
        <div className="row d-flex flex-column justify-content-center align-items-center w-100 p-0 m-0">
          <div className="w-100 card col-md-5 p-0 mb-2">
            <NavLink
              className="p-3 nav-item nav-link btn auth-nav-btn m-0"
              activeClassName="selected"
              to="/onboarding"
            >
              Активиране
            </NavLink>
          </div>
          <div className="w-100 card col-md-5 p-0 m-0">
            <NavLink
              className="p-3 nav-item nav-link btn auth-nav-btn m-0"
              activeClassName="selected"
              to="/login"
            >
              Влизане
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavigation;
