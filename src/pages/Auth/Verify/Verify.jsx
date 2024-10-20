import { useEffect } from "react";
import AuthenticationLayout from "../../../components/Auth/AuthenticationLayout";
import InputGA from "../../../components/Common/InputGA";
import { DeviceApi } from "../../../services/Device/Api";
import { useTotp } from "../../../utils/hooks";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const Verify = ({ deviceId }) => {
  const { totp, setTotp, isTotpSent, setIsTotpSent, error, setError } =
    useTotp();

  const verifyDevice = async () => {};

  useEffect(() => {
    const sendTOTPVerification = async () => {
      try {
        await DeviceApi.get().sendTOTP({
          deviceId,
        });
        setIsTotpSent(true);
      } catch (ex) {
        setError(ex.message);
      }
    };

    sendTOTPVerification();
  }, [deviceId, setIsTotpSent, setError]);

  if (!isTotpSent) return <LoadingSpinner />;

  return (
    <>
      <AuthenticationLayout header={"Имейл за получаване на TOTP"}>
        <h5 className="text-danger d-flex justify-content-center my-0 mb-3">
          Проверете имейла на чичо Манчо за TOTP.
        </h5>
        <form method="post" onSubmit={verifyDevice}>
          <InputGA
            name="TOTP"
            value={totp}
            setValue={setTotp}
            placeholder="Въведете полученото TOTP от чичо Манчо :)"
            id="text"
            type="text"
            error={error}
          />
        </form>
      </AuthenticationLayout>
    </>
  );
};

export default Verify;
