import { useEffect, useRef } from "react";
import { DeviceApi } from "../../../services/Device/Api";
import { useLoading, useTotp } from "../../../utils/hooks";
import { useNavigate } from "react-router-dom";
import {
  DeviceAlreadyVerified,
  MESSAGE_TYPE,
  SUCCESSFULL_VERIFICATION,
} from "../../../utils/appConstants";
import { Button } from "@mui/material";
import AuthLayout from "../../../components/Auth/AuthLayout";
import InputGA from "../../../components/Common/InputGA";
import Storage from "../../../utils/storage/Storage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";

const Verify = () => {
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
        deviceId: Storage.getDeviceId(),
        totp: totp,
      });

      setLoading(false);

      navigate(
        `/login?email=${Storage.getEmail()}&message=${SUCCESSFULL_VERIFICATION}&type=${
          MESSAGE_TYPE.SUCCESS
        }`,
        { replace: true }
      );
    } catch (ex) {
      setLoading(false);
      setError("Възникна грешка!");
    }
  };

  useEffect(() => {
    const sendTOTPVerification = async () => {
      try {
        await DeviceApi.get().sendTOTP({
          deviceId: Storage.getDeviceId(),
        });

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

  return (
    <>
      {!isTotpSent || loading && <LoadingSpinner />}
      <AuthLayout
        header={"Имейл за получаване на TOTP"}
        setError={setError}
        isResendTotpVeryfying={true}
      >
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла на чичо Манчо за TOTP.
        </h5>
        <form method="post" onSubmit={verifyDevice}>
          <InputGA
            name="TOTP"
            value={totp}
            setValue={(e) => setTotp(e.target.value)}
            placeholder="Въведете полученото TOTP от чичо Манчо :)"
            id="text"
            type="text"
            error={error}
          />

          <Button
            type="submit"
            className="fw-bold w-100 p-3"
            variant="contained"
            color="error"
          >
            Верифицирай
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default Verify;
