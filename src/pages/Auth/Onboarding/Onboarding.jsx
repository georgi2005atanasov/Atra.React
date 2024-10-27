import { useState } from "react";
import { DeviceApi } from "../../../services/Device/Api";
import { useLoading, useTotp } from "../../../utils/hooks";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout";
import InputGA from "../../../components/Common/InputGA";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useHandlers } from "./hooks";
import PasswordFieldGA from "../../../components/Common/PasswordFieldGA";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ROLES } from "../../../utils/appConstants";
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
    totp,
    setTotp,
    role,
    setRole,
  } = useHandlers();

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthenticationLayout header={"Активация"} error={error}>
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла си за получено TOTP.
        </h5>

        <form method="post" onSubmit={pair}>
          <InputGA
            name="TOTP за Активация"
            value={totp}
            setValue={(e) => setTotp(e.target.value)}
            placeholder="TOTP"
            type="text"
          />

          {/* TODO SelectGA */}
          <SelectGA id="role" label="Аз съм" value={role} onChange={setRole}>
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
            autoComplete="off"
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
          />

          <PasswordFieldGA
            name="Повтори парола"
            password={repeatPassword}
            setPassword={(e) => setRepeatPassword(e.target.value)}
            id="confirmPassword"
          />

          <Button
            type="submit"
            className="fw-bold w-100 p-2"
            variant="contained"
            color="error"
          >
            Активирай
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

export default Onboarding;
