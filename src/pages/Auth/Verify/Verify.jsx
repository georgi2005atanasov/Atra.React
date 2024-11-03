import { Button } from "@mui/material";
import { useHandlers } from "./hooks";
import AuthLayout from "../../../components/Auth/AuthLayout";
import InputGA from "../../../components/Common/InputGA";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";

const Verify = () => {
  const { verifyDevice, isTotpSent, totp, setTotp, loading, error, setError } =
    useHandlers();

  return (
    <>
      {!isTotpSent || (loading && <LoadingSpinner />)}
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
