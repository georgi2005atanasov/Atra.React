import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useResendTotp, useTotp } from "../../../utils/hooks.js";
import { DeviceApi } from "../../../services/Device/Api.js";
import { CryptographyApi } from "../../../services/Cryptography/Api.js";
import { IdentityApi } from "../../../services/Identity/Api.js";
import { generateUID } from "../../../utils/commonUtils.js";
import Storage from "../../../utils/storage/Storage.js";

export const useHandlers = () => {
  const { email: passedEmail } = useLoaderData();
  const [email, setEmail] = useState(passedEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { totp, setTotp } = useTotp();
  const navigate = useNavigate();
  const {
    resendTotp,
    showResendButton,
    isResending,
    countdown,
  } = useResendTotp();

  const login = async (event) => {
    event.preventDefault();

    try {
      const payload = generateUID();
      const r = await CryptographyApi.get().sign({
        payload: payload,
        email,
      });

      const userName = await IdentityApi.get().login({
        totp,
        email,
        password,
        signature: r.data.signature,
        payload,
      });

      Storage.setEmail(email);
      Storage.setUserName(userName);

      navigate("/private/dashboard", { replace: true });
    } catch (ex) {
      console.log(ex);
      setError(ex.message);
    }
  };

  return {
    login,
    resendTotp,
    showResendButton,
    isResending,
    error,
    email,
    setEmail,
    password,
    setPassword,
    totp,
    setTotp,
    countdown,
  };
};
