import { redirect } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";
import logo from "../../../assets/atraLogo.png";
import InputGA from "../../../components/Common/InputGA.jsx";
import PasswordFieldGA from "../../../components/Common/PasswordFieldGA.jsx";
import { useHandlers } from "./hooks.jsx";

const ResetPassword = () => {
  const {
    resetPassword,
    sendResetPasswordEmail,
    repeatPassword,
    setRepeatPassword,
    loading,
    success,
    error,
    email,
    setEmail,
    password,
    setPassword,
    token,
  } = useHandlers();

  if (token)
    return (
      <>
        <div className="container-fluid p-md-0 p-4 d-flex flex-column justify-content-md-center justify-content-start align-items-center vh-100">
          <div className="row w-lg-25 flex-column">
            <div className="col-lg-6 w-100 px-0">
              <header className="p-2 non-selectable text-center card d-flex justify-content-center align-items-center">
                <h1>Смяна на парола</h1>
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
              <form method="post" onSubmit={resetPassword}>
                <PasswordFieldGA
                  password={password}
                  setPassword={(e) => setPassword(e.target.value)}
                  id="password"
                  label="Нова парола"
                />

                <PasswordFieldGA
                  password={repeatPassword}
                  setPassword={(e) => setRepeatPassword(e.target.value)}
                  id="confirmPassword"
                  label="Повтори новата парола"
                />

                <Button
                  type="submit"
                  className="fw-bold w-100 p-3"
                  variant="contained"
                  color="error"
                >
                  Смени парола
                </Button>
              </form>

              {error && (
                <h5 className="mt-3 text-center text-danger">{error}</h5>
              )}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="container-fluid p-md-0 p-4 d-flex flex-column justify-content-md-center justify-content-start align-items-center vh-100">
        <div className="row w-lg-25 flex-column">
          <div className="col-lg-6 w-100 px-0">
            <header className="p-2 non-selectable text-center card d-flex justify-content-center align-items-center">
              <h1>Смяна на парола</h1>
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
            <form method="post" onSubmit={sendResetPasswordEmail}>
              <InputGA
                name="E-mail"
                value={email}
                setValue={(e) => setEmail(e.target.value)}
                placeholder="Въведете вашия имейл"
                id="email"
                type="email"
                required
              />

              <Button
                type="submit"
                className="fw-bold w-100 p-3"
                variant="contained"
                color="error"
              >
                Изпрати
              </Button>
            </form>

            {error && <h5 className="mt-3 text-center text-danger">{error}</h5>}
            {success && (
              <h5 className="mt-3 text-center text-success">{success}</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");

    return {
      token,
      email,
    };
  } catch {
    return redirect("/");
  }
}

export default ResetPassword;
