import { useEffect, useRef } from "react";
import { DeviceApi } from "../../../services/Device/Api";
import { DeviceAlreadyVerified, MESSAGE_TYPE, SUCCESSFULL_VERIFICATION } from "../../../utils/appConstants";
import { useTotp } from "../../../utils/hooks";
import { useLoading } from "../../../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import Storage from "../../../utils/storage/Storage";

export const useHandlers = () => {
    const { totp, setTotp, isTotpSent, setIsTotpSent, error, setError } =
    useTotp();
  const navigate = useNavigate();
  const didSendTOTP = useRef(false);
  const { loading, setLoading } = useLoading();

  const verifyDevice = async (event) => {
    try {
      event.preventDefault();

      setLoading(true);

      await DeviceApi.get().verifyDevice({
        totp: totp,
      });

      setLoading(false);

      navigate(
        `/login?email=${Storage.getEmail()}&message=${SUCCESSFULL_VERIFICATION}&type=${
          MESSAGE_TYPE.SUCCESS
        }`,
        { replace: true }
      );
    } catch {
      setLoading(false);
      setError("Възникна грешка!");
    }
  };

  useEffect(() => {
    const sendTOTPVerification = async () => {
      try {
        await DeviceApi.get().sendTOTP();

        setIsTotpSent(true);
      } catch (ex) {
        if (ex.message === DeviceAlreadyVerified) {
          navigate(`/?message=${DeviceAlreadyVerified}`, { replace: true });
          return;
        }
        setError(ex.message);
      }
    };

    if (!isTotpSent && !didSendTOTP.current) {
      didSendTOTP.current = true;
      sendTOTPVerification();
    }
  }, [isTotpSent, navigate, setIsTotpSent, setError]);

  return {
    verifyDevice,
    isTotpSent,
    totp,
    setTotp,
    loading,
    error,
    setError,
  };
}