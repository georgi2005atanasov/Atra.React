import logo from "../../assets/atraLogo.png";
import AuthNavigation from "../../components/Auth/AuthNavigation";

// eslint-disable-next-line react/prop-types
const AuthenticationLayout = ({ header, children }) => {
  return (
    <div className="container-fluid m-md-0 m-3 d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-lg-25 flex-column">
        <div className="col-lg-6 w-100 px-0">
          <header className="non-selectable text-center card d-flex justify-content-center align-items-center">
            <h1>{header}</h1>
          </header>
        </div>

        <div className="card p-4 shadow-lg mt-3">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Company Logo"
              className="mb-3 w-50 non-selectable"
              draggable="false"
            />
          </div>
          {children}
        </div>

        <AuthNavigation />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
