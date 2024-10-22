import { useState } from "react";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout";
import InputGA from "../../../components/Common/InputGA";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { DeviceApi } from "../../../services/Device/Api";
import { useLoading, useTotp } from "../../../utils/hooks";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";

// todo: load email from start
const Onboarding = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { email: passedEmail } = useLoaderData();
  const [email, setEmail] = useState(passedEmail);
  const [error, setError] = useState();
  const { loading, setLoading } = useLoading();
  const { totp, setTotp } = useTotp();
  const navigate = useNavigate();

  const pair = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setError("Въведените пароли не съвпадат!");
      return;
    }

    try {
      setLoading(true);

      await DeviceApi.get().pair({
        totp: totp,
        email,
        password,
        userName,
      });

      navigate("/verify", { replace: true });
    } catch (ex) {
      console.log(ex);
      setError(ex.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthenticationLayout header={"Активация"}>
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла си за получено TOTP.
        </h5>

        <form method="post" onSubmit={pair}>
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
            autoComplete="off"
          />

          <InputGA
            name="Потребителско име"
            value={userName}
            setValue={setUserName}
            placeholder="Въведете потребителско име"
            id="userName"
            type="text"
          />

          <InputGA
            name="Парола"
            value={password}
            setValue={setPassword}
            placeholder="Въведете вашата парола"
            id="password"
            type="password"
          />

          <InputGA
            name="Повтори парола"
            value={repeatPassword}
            setValue={setRepeatPassword}
            placeholder="Въведете вашата парола"
            id="confirmPassword"
            type="password"
          />

          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{ fontWeight: "bold" }}
          >
            Активирай
          </button>
        </form>
        {error && <h5 className="mt-3 text-center text-danger">{error}</h5>}
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

export default Onboarding;
