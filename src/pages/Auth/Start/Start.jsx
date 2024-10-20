import { useState } from "react";
import { useSubmit } from "react-router-dom";
import { useLoading, useTotp } from "../../../utils/hooks.js";
import { DeviceApi } from "../../../services/Device/Api.js";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout.jsx";
import InputGA from "../../../components/Common/InputGA.jsx";
import "../Login/Login.jsx";

const Start = () => {
  const submit = useSubmit();
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useLoading();
  const { isTotpSent, setIsTotpSent, error, setError } = useTotp();

  const requirePair = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { hasProfile, isVerified } = await DeviceApi.get().requireAuth({
        email,
      });

      setIsTotpSent(true);
      setError("");
      setLoading(false);
      
      if (hasProfile && isVerified)
        submit(null, { method: "GET", action: "/login" });

      if (hasProfile && !isVerified)
        submit(null, { method: "GET", action: "/verify" });

      if (!hasProfile)
        submit(null, { method: "GET", action: "/onboarding" });
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

export default Start;
