import { useLoaderData, useNavigate } from "react-router-dom";
import { DeviceApi } from "../../../services/Device/Api";
import { useLoading, useTotp } from "../../../utils/hooks";
import { useState } from "react";

export const useHandlers = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("");
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

  return {
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
  };
};
