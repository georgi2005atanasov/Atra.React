import { useLoaderData, useNavigate } from "react-router-dom";
import { DeviceApi } from "../../../services/Device/Api";
import { useLoading, useTotp } from "../../../utils/hooks";
import { useState } from "react";
import Storage from "../../../utils/storage/Storage";

export const useHandlers = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { loading, setLoading } = useLoading();
    const { isTotpSent, setIsTotpSent, error, setError } = useTotp();
    const { message } = useLoaderData();
  
    const requirePair = async (event) => {
      event.preventDefault();
  
      try {
        setLoading(true);
  
        const r = await DeviceApi.get().requireAuth({
          email,
        });
  
        setIsTotpSent(true);
        setError("");
        setLoading(false);
  
        Storage.setEmail(email);
  
        // TODO: query builder?
        if (r.data.hasProfile && r.data.isVerified)
          navigate(`/login?email=${email}`, { replace: true });
        else if (!r.data.hasProfile)
          navigate(`/onboarding?email=${email}`, { replace: true });
        else if (r.data.hasProfile && !r.data.isVerified)
          navigate("/verify", { replace: true });
      } catch (ex) {
        setLoading(false);
        setError(ex.message);
        console.error(ex);
      }
    };

    return {
        requirePair,
        isTotpSent,
        error,
        email,
        setEmail,
        loading,
        message,
    };
}