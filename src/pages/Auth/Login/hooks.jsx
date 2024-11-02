import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useLoading, useResendTotp, useTotp } from "../../../utils/hooks.js";
import { CryptographyApi } from "../../../services/Cryptography/Api.js";
import { IdentityApi } from "../../../services/Identity/Api.js";
import { generateUID } from "../../../utils/commonUtils.js";
import Storage from "../../../utils/storage/Storage.js";

export const useHandlers = () => {
  const { email: passedEmail, message, type } = useLoaderData();
  const [email, setEmail] = useState(passedEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { totp, setTotp } = useTotp();
  const navigate = useNavigate();
  const { resendTotp, showResendButton, isResending, countdown } =
    useResendTotp(Storage.getEmail() || passedEmail, setError);
  const { setLoading, loading } = useLoading();

  const login = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const payload = generateUID();
      const r = await CryptographyApi.get().sign({
        payload: payload,
        email,
      });

      await IdentityApi.get().login({
        totp,
        email,
        password,
        signature: r.data.signature,
        payload,
      });
      setLoading(false);

      navigate("/private/dashboard", { replace: true });
    } catch (ex) {
      setLoading(false);
      setError(ex.response.data.error);
    }
  };

  return {
    login,
    showResendButton,
    isResending,
    error,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    totp,
    setTotp,
    countdown,
    loading,
    message,
    type,
  };
};
