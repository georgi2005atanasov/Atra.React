import { redirect } from "react-router-dom";
import { ROLES } from "../../../utils/appConstants";
import { useHandlers } from "./hooks";
import {
  Button,
  MenuItem,
} from "@mui/material";
import AuthLayout from "../../../components/Auth/AuthLayout";
import InputGA from "../../../components/Common/InputGA";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import PasswordFieldGA from "../../../components/Common/PasswordFieldGA";
import SelectGA from "../../../components/Common/SelectGA";

// todo: load email from start
const Onboarding = () => {
  const {
    pair,
    userName,
    setUserName,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    email,
    setEmail,
    loading,
    error,
    setError,
    totp,
    setTotp,
    role,
    setRole,
  } = useHandlers();

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthLayout
        header={"Активация"}
        error={error}
        setError={setError}
      >
        {!error && (
          <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
            Проверете имейла си за получено TOTP.
          </h5>
        )}

        <form method="post" onSubmit={pair}>
          <InputGA
            name="TOTP за Активация"
            value={totp}
            setValue={(e) => setTotp(e.target.value)}
            placeholder="TOTP"
            type="text"
          />

          {/* TODO SelectGA */}
          <SelectGA value={role} setValue={(e) => setRole(e.target.value)} label="Аз съм" id="role">
            <MenuItem value={ROLES.ADMIN}>Администратор</MenuItem>
            <MenuItem value={ROLES.EMPLOYEE}>Работник</MenuItem>
          </SelectGA>
         
          <InputGA
            name="E-mail"
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            placeholder="Въведете вашия имейл"
            id="email"
            type="email"
          />

          <InputGA
            name="Потребителско име"
            value={userName}
            setValue={(e) => setUserName(e.target.value)}
            placeholder="Въведете потребителско име"
            id="userName"
            type="text"
          />

          <PasswordFieldGA
            password={password}
            setPassword={(e) => setPassword(e.target.value)}
            id="password"
            label="Парола"
          />

          <PasswordFieldGA
            password={repeatPassword}
            setPassword={(e) => setRepeatPassword(e.target.value)}
            id="confirmPassword"
            label="Повтори парола"
          />

          <Button
            type="submit"
            className="fw-bold w-100 p-3"
            variant="contained"
            color="error"
          >
            Активирай
          </Button>
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
