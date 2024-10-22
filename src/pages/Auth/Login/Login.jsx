import { useState } from "react";
import { IdentityApi } from "../../../services/Identity/Api.js";
import { CryptographyApi } from "../../../services/Cryptography/Api.js";
import { useTotp } from "../../../utils/hooks.js";
import InputGA from "../../../components/Common/InputGA.jsx";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout.jsx";
import { generateUID } from "../../../utils/commonUtils.js";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { totp, setTotp } = useTotp();

  const login = async (event) => {
    event.preventDefault();

    try {
      const payload = generateUID();
      const r = await CryptographyApi.get().sign({
        payload: payload,
        email,
      });

      await IdentityApi.get().login({
        email,
        password,
        signature: r.data.signature,
        payload,
      });
    } catch (ex) {
      console.log(ex);
      setError(ex.message);
    }
  };

  return (
    <AuthenticationLayout header={"Вход"}>
      {!error && (
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла си за получено TOTP.
        </h5>
      )}

      <form method="post" onSubmit={login}>
        <InputGA
          name="TOTP за Активация"
          value={totp}
          setValue={setTotp}
          placeholder="OTP"
          type="text"
        />

        <InputGA
          name="E-mail"
          value={email}
          setValue={setEmail}
          placeholder="Въведете вашия имейл"
          id="email"
          type="email"
        />

        <InputGA
          name="Парола"
          value={password}
          setValue={setPassword}
          placeholder="Въведете вашата парола"
          id="password"
          type="password"
        />

        <button
          type="submit"
          className="btn btn-danger w-100"
          style={{ fontWeight: "bold" }}
        >
          Влез
        </button>

        {error && <h6 className="text-danger mt-2">{error}</h6>}
      </form>
    </AuthenticationLayout>
  );
};

export default Login;
