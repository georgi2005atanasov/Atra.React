import { useEffect } from "react";
import { DeviceApi } from "../../../services/Device/Api";
import { useTotp } from "../../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { DeviceAlreadyVerified } from "../../../utils/appConstants";
import { Button } from "@mui/material";
import AuthLayout from "../../../components/Auth/AuthLayout";
import InputGA from "../../../components/Common/InputGA";
import Storage from "../../../utils/storage/Storage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";

const Verify = () => {
  const { totp, setTotp, isTotpSent, setIsTotpSent, error, setError } =
    useTotp();
  const navigate = useNavigate();

  const verifyDevice = async (event) => {
    try {
      event.preventDefault();

      await DeviceApi.get().verifyDevice({
        deviceId: Storage.getDeviceId(),
        totp: totp,
      });

      navigate("/login", { replace: true });
    } catch (ex) {
      console.log(ex);
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

    if (!isTotpSent) sendTOTPVerification();
  }, [setIsTotpSent, setError, navigate, isTotpSent]);

  if (!isTotpSent) return <LoadingSpinner />;

  return (
    <>
      <AuthLayout header={"Имейл за получаване на TOTP"}>
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
