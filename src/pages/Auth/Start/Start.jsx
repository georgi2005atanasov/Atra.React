import { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useLoading, useTotp } from "../../../utils/hooks.js";
import { DeviceApi } from "../../../services/Device/Api.js";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout.jsx";
import InputGA from "../../../components/Common/InputGA.jsx";
import "../Login/Login.jsx";

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

      // TODO: query builder?
      if (r.data.hasProfile && r.data.isVerified)
        navigate(`/login?email=${email}`, { replace: true });
      else if (!r.data.hasProfile)
        navigate(`/onboarding?email=${email}`, { replace: true });
      else if (r.data.hasProfile && !r.data.isVerified)
        navigate("/verify", { replace: true });
    } catch (ex) {
      setLoading(false);
      setError("Възникна грешка. Моля, проверете имейла си.");
      console.error(ex);
    }
  };

  if (isTotpSent) return <></>;

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthenticationLayout header={"Имейл за получаване на TOTP"}>
        <h6 className="text-center text-danger">{message && message}</h6>
        <form method="post" onSubmit={requirePair}>
          <InputGA
            name="E-mail"
            value={email}
            setValue={setEmail}
            placeholder="Въведете вашия имейл"
            id="email"
            type="email"
            error={error}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{ fontWeight: "bold" }}
          >
            Изпрати OTP
          </button>
        </form>
      </AuthenticationLayout>
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
