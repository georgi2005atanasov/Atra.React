import { useEffect, useState } from "react";
import { DeviceApi } from "../../../services/Device/Api.js";
import "../Login/Login.jsx";
import AuthenticationLayout from "../AuthenticationLayout.jsx";
import InputGA from "../../../components/Common/InputGA.jsx";
import { useSubmit } from "react-router-dom";
import { useLoading } from "../../../utils/hooks.js";
import LoadingSpinner from "../../../components/Common/LoadingSpinner.jsx";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [userStatus, setUserStatus] = useState({
    hasProfile: false,
    isVerified: false,
  });
  const submit = useSubmit();
  const { loading, setLoading } = useLoading();

  const pair = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await DeviceApi.get().pair({
        otp,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const requirePair = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { hasProfile, isVerified } = await DeviceApi.get().requireAuth({
        email,
      });

      setOtpSent(true);
      setUserStatus({
        hasProfile,
        isVerified,
      });
      setError('');
    } catch (err) {
      setError("Възникна грешка. Моля, проверете имейла си.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userStatus.hasProfile && userStatus.isVerified)
      submit(null, { method: "POST", action: "/login" });
  }, [userStatus, submit]);

  if (!otpSent)
    return (
      <>
        {loading && <LoadingSpinner />}
        <AuthenticationLayout header={"Имейл за получаване на TOTP"}>
          <form method="post" onSubmit={requirePair}>
            <InputGA
              name="E-mail"
              value={email}
              setValue={setEmail}
              placeholder="Въведете вашия имейл"
              id="email"
              type="email"
              error={error}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn btn-danger w-100"
              style={{ fontWeight: "bold" }}
            >
              Изпрати OTP
            </button>
          </form>
        </AuthenticationLayout>
      </>
    );

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthenticationLayout header={"Активация"}>
        <form method="post" onSubmit={pair}>
          <InputGA
            name="TOTP за Активация"
            value={otp}
            setValue={setOtp}
            placeholder="OTP"
            type="text"
          />
          <InputGA
            name="E-mail"
            value={email}
            setValue={setEmail}
            placeholder="Въведете вашия имейл"
            id="email"
            type="email"
            autoComplete="off"
          />
          <InputGA
            name="Потребителско име"
            value={userName}
            setValue={setUserName}
            placeholder="Въведете потребителско име"
            id="userName"
            type="text"
          />
          <InputGA
            name="Парола"
            value={password}
            setValue={setPassword}
            placeholder="Въведете вашата парола"
            id="password"
            type="password"
          />
          <InputGA
            name="Повтори парола"
            value={repeatPassword}
            setValue={setRepeatPassword}
            placeholder="Въведете вашата парола"
            id="password"
            type="password"
          />
          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{ fontWeight: "bold" }}
          >
            Активирай
          </button>
        </form>
        {error && <h5 className="mt-3 text-center text-danger">{error}</h5>}
      </AuthenticationLayout>
    </>
  );

  // return (
  //   <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
  //     <div className="row w-lg-25 flex-column">
  //       <div className="col-lg-6 w-100">
  //         <header className="non-selectable text-center card d-flex justify-content-center align-items-center">
  //           <h1>Активация</h1>
  //         </header>
  //         <div className="card p-4 shadow-lg mt-3">
  //           {/* Logo at the top */}
  //           <div className="text-center mb-4">
  //             <img
  //               src={logo}
  //               alt="Company Logo"
  //               className="mb-3 w-50 non-selectable"
  //               draggable="false"
  //             />
  //           </div>
  //           <form method="post" onSubmit={pair}>
  //             <div className="form-group mb-3">
  //               <label htmlFor="email" className="non-selectable">
  //                 E-mail
  //               </label>
  //               <input
  //                 type="email"
  //                 className="form-control non-selectable"
  //                 id="email"
  //                 placeholder="Въведете вашия имейл"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div className="form-group mb-3">
  //               <label htmlFor="password" className="non-selectable">
  //                 Повтори парола
  //               </label>
  //               <input
  //                 type="password"
  //                 className="form-control non-selectable"
  //                 id="password"
  //                 placeholder="Въведете вашата парола"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div className="form-group mb-4">
  //               <label htmlFor="password" className="non-selectable">
  //                 Парола
  //               </label>
  //               <input
  //                 type="password"
  //                 className="form-control non-selectable"
  //                 id="password"
  //                 placeholder="Въведете вашата парола"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <button
  //               type="submit"
  //               className="btn btn-danger w-100"
  //               style={{ fontWeight: "bold" }}
  //             >
  //               Влез
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Onboarding;
