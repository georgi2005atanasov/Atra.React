import { Link, redirect } from "react-router-dom";
import { useHandlers } from "./hooks.jsx";
import { Button } from "@mui/material";
import AuthLayout from "../../../components/Auth/AuthLayout.jsx";
import InputGA from "../../../components/Common/InputGA.jsx";
import PasswordFieldGA from "../../../components/Common/PasswordFieldGA.jsx";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";
import MessageAlertGA from "../../../components/Common/MessageAlertGA.jsx";
import { useState } from "react";
import "./Login.css";

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
    message,
    type,
  } = useHandlers();
  const [messageVisible, setMessageVisible] = useState(true);

  return (
    <>
      {message && messageVisible && 
      <MessageAlertGA
        message={message}
        type={type}
        onClose={() => setMessageVisible(false)}
      />}
      <AuthLayout header={"Вход"} error={error} setError={setError}>
        {!error && (
          <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
            Проверете имейла си за получено TOTP.
          </h5>
        )}
        <form method="post" onSubmit={login}>
          <InputGA
            name="TOTP за Вход"
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
            className="fw-bold w-100 p-3"
            variant="contained"
            color="error"
          >
            Влез
          </Button>

          <div className="text-center mt-2">
            <Link
              to="/reset-password"
              className="w-100 text-danger text-center"
            >
              Забравена парола?
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const message = url.searchParams.get("message");
    const type = url.searchParams.get("type");

    if (!email)
      return {
        message: "Невалиден имейл!",
        type: "danger",
      };

    return {
      email,
      message,
      type,
    };
  } catch {
    return redirect("/");
  }
}

export default Login;
