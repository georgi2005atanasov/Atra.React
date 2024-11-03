import { useState } from "react";
import { IdentityApi } from "../../../services/Identity/Api";
import { MESSAGE_TYPE } from "../../../utils/appConstants";
import { useLoading } from "../../../utils/hooks";
import { useLoaderData, useNavigate } from "react-router-dom";
import Storage from "../../../utils/storage/Storage";

export const useHandlers = () => {
    const navigate = useNavigate();
    const { token, email: passedEmail } = useLoaderData();
    const [email, setEmail] = useState(passedEmail);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const { loading, setLoading } = useLoading();
  
    const sendResetPasswordEmail = async (event) => {
      event.preventDefault();
  
      try {
        setLoading(true);
  
        await IdentityApi.get().sendPasswordReset({
          email,
        });
  
        Storage.setEmail(email);
  
        setSuccess("Моля, отворете линка, изпратен на имейла Ви.");
        setError("");
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setSuccess("");
        setError(ex.message);
        console.error(ex);
      }
    };
  
    const resetPassword = async (event) => {
      event.preventDefault();
  
      if (password != repeatPassword) {
        setError("Паролите не съвпадат!");
        return;
      }
  
      try {
        setLoading(true);
  
        await IdentityApi.get().resetPassword(token, email, {
          password: password,
        });
  
        Storage.setEmail(email);
  
        setLoading(false);
        navigate(
          `/login?email=${passedEmail}&message=Успешна смяна на парола!&type=${MESSAGE_TYPE.SUCCESS}`,
          { replace: true }
        );
      } catch (ex) {
        setLoading(false);
        setError(ex.message);
        setSuccess("");
        console.error(ex);
      }
    };

    return {
        resetPassword,
        sendResetPasswordEmail,
        repeatPassword,
        setRepeatPassword,
        loading,
        success,
        error,
        email,
        setEmail,
        password,
        setPassword,
        token,
    };
}