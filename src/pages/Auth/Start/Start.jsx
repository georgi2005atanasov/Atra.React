import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const requirePair = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // const { hasProfile, isVerified } = await DeviceApi.get().requireAuth({
      //   email,
      // });
      const {hasProfile, isVerified} = {hasProfile: false}

      setIsTotpSent(true);
      setError("");
      setLoading(false);

      if (hasProfile && isVerified)
        navigate('/login', { replace: true });
      else if (!hasProfile)
        navigate('/onboarding', { replace: true });
      else if (hasProfile && !isVerified)
        navigate('/verify', { replace: true });

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
