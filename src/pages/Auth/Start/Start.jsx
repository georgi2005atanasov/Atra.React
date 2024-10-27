import { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useLoading, useTotp } from "../../../utils/hooks.js";
import { DeviceApi } from "../../../services/Device/Api.js";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";
import logo from "../../../assets/atraLogo.png";
import "../Login/Login.jsx";
import Storage from "../../../utils/storage/Storage.js";
import { Button, TextField } from "@mui/material";
import InputGA from "../../../components/Common/InputGA.jsx";

const Start = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useLoading();
  const { isTotpSent, setIsTotpSent, error, setError } = useTotp();
  const { message } = useLoaderData();

  const requirePair = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const r = await DeviceApi.get().requireAuth({
        email,
      });

      setIsTotpSent(true);
      setError("");
      setLoading(false);

      Storage.setEmail(email);

      // TODO: query builder?
      if (r.data.hasProfile && r.data.isVerified)
        navigate(`/login?email=${email}`, { replace: true });
      else if (!r.data.hasProfile)
        navigate(`/onboarding?email=${email}`, { replace: true });
      else if (r.data.hasProfile && !r.data.isVerified)
        navigate("/verify", { replace: true });
    } catch (ex) {
      setLoading(false);
      setError(ex.message);
      console.error(ex);
    }
  };

  if (isTotpSent) return <></>;

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container-fluid p-md-0 p-4 d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
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
                autoComplete="off"
                error={error}
                required
              />

              <Button
                type="submit"
                className="fw-bold w-100 p-2"
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
