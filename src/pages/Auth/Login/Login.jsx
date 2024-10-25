import InputGA from "../../../components/Common/InputGA.jsx";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout.jsx";
import { redirect } from "react-router-dom";
import { useHandlers } from "./hooks.jsx";
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
  } = useHandlers();

  return (
    <AuthenticationLayout header={"Вход"} error={error}>
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
          placeholder="TOTP"
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
      </form>
    </AuthenticationLayout>
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
