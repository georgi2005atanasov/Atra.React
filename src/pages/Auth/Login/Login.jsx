import InputGA from "../../../components/Common/InputGA.jsx";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout.jsx";
import { redirect } from "react-router-dom";
import { useHandlers } from "./hooks.jsx";
import { Button } from "@mui/material";
import PasswordFieldGA from "../../../components/Common/PasswordFieldGA.jsx";
import "./Login.css";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";

const Login = () => {
  const {
    login,
    email,
    setEmail,
    password,
    setPassword,
    totp,
    setTotp,
    error,
    setError,
    loading,
  } = useHandlers();

  return (<>
    {loading && <LoadingSpinner />}
    <AuthenticationLayout header={"Вход"} error={error} setError={setError}>
      {!error && (
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла си за получено TOTP.
        </h5>
      )}
      <form method="post" onSubmit={login}>
        <InputGA
          name="TOTP за Активация"
          value={totp}
          setValue={(e) => setTotp(e.target.value)}
          placeholder="TOTP"
          type="text"
          required
        />

        <InputGA
          name="E-mail"
          value={email}
          setValue={(e) => setEmail(e.target.value)}
          placeholder="Въведете вашия имейл"
          id="email"
          type="email"
          required
        />

        <PasswordFieldGA
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
          id="password"
          label="Парола"
        />

        <Button
          type="submit"
          className="fw-bold w-100 p-2"
          variant="contained"
          color="error"
        >
          Влез
        </Button>
      </form>
    </AuthenticationLayout>
  </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email)
      return {
        error: "Невалиден имейл!",
      };

    return {
      email,
    };
  } catch {
    return redirect("/");
  }
}

export default Login;
