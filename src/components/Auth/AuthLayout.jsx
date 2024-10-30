import logo from "../../assets/atraLogo.png";
import { useResendTotp } from "../../utils/hooks";
import Storage from "../../utils/storage/Storage";
import "./AuthLayout.css";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ header, error, setError, isResendTotpVeryfying = false, children }) => {
  const { resendTotp, showResendButton, isResending, countdown } =
    useResendTotp(Storage.getEmail(), setError);

  return (
    <div className="container-fluid m-3 d-flex flex-column justify-content-md-center justify-content-start align-items-center vh-100">
      <div className="row w-lg-25 flex-column">
        <div className="col-lg-6 w-100 px-0">
          <header className="p-2 non-selectable text-center card d-flex justify-content-center align-items-center">
            <h1>{header}</h1>
          </header>
        </div>

        <div className="card p-4 shadow-lg mt-3">
          <div className="text-center mb-2">
            <img
              src={logo}
              alt="Company Logo"
              className="mb-3 w-50 non-selectable"
              draggable="false"
            />
          </div>
          {children}
          {showResendButton && (
            <div className="w-100 d-flex justify-content-center">
              <button
                type="button"
                className="btn d-flex text-danger text-decoration-underline btn-sm pt-3 border-0"
                onClick={resendTotp.bind(this, isResendTotpVeryfying)}
                disabled={isResending}
              >
                {isResending ? "Изпращане..." : "Изпрати нов код"}
              </button>
            </div>
          )}
          {countdown > 0 && (
            <small className="text-muted pt-3 text-center">
              Нов код може да бъде изпратен след: {countdown} сек.
            </small>
          )}
          {error && <h5 className="mt-3 text-center text-danger">{error}</h5>}
        </div>
        {/* <AuthNavigation /> */}
      </div>
    </div>
  );
};

export default AuthLayout;
