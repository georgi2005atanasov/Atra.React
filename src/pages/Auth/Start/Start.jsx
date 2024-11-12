import { redirect } from "react-router-dom";
import { Button } from "@mui/material";
import { useHandlers } from "./hooks.jsx";
import logo from "../../../assets/atraLogo.png";
import InputGA from "../../../components/Common/InputGA.jsx";

const Start = () => {
  const { requirePair, isTotpSent, error, email, setEmail, message } =
    useHandlers();

  if (isTotpSent) return <></>;

  return (
    <>
      <div className="container-fluid p-md-0 p-4 d-flex flex-column justify-content-md-center justify-content-start align-items-center vh-100">
        <div className="row w-lg-25 flex-column">
          <div className="col-lg-6 w-100 px-0">
            <header className="p-2 non-selectable text-center card d-flex justify-content-center align-items-center">
              <h1>Имейл за получаване на TOTP</h1>
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
            <h6 className="text-center text-danger">{message && message}</h6>
            <form method="post" onSubmit={requirePair}>
              <InputGA
                name="E-mail"
                value={email}
                setValue={(e) => setEmail(e.target.value)}
                placeholder="Въведете вашия имейл"
                id="email"
                type="email"
                error={error}
                required
              />

              <Button
                type="submit"
                className="fw-bold w-100 p-3"
                variant="contained"
                color="error"
              >
                Изпрати TOTP
              </Button>
            </form>
            {error && <h5 className="mt-3 text-center text-danger">{error}</h5>}
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
    const message = url.searchParams.get("message");

    if (!message)
      return {
        message: "",
      };

    return {
      message,
    };
  } catch {
    return redirect("/");
  }
}

export default Start;
