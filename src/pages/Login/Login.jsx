import { useState } from "react";
import { Api as IdentityApi } from "../../services/Identity/Api.js";
import logo from "../../assets/atraLogo.png";
import "./Login.css";
import SecureStorage from "../../utils/storage/SecureStorage.js";
import InputGA from "../../components/Common/InputGA.jsx";
import HeaderGA from "../../components/Common/HeaderGA.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      await IdentityApi.get().login({
        email,
        password,
        // ...getSignatureData()
      });
    } catch (err) {
      console.log(err);
    }
  };

  const s = async () => {
    console.log(await SecureStorage.getPrivateKey());
    console.log(await SecureStorage.getPublicKey());
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-lg-25 flex-column">
        <div className="col-lg-6 w-100">
          {/* <HeaderGA tag="h1">Вход</HeaderGA> */}

          <div className="card p-4 shadow-lg mt-3">
            {/* Logo at the top */}
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Company Logo"
                className="mb-3 w-50 non-selectable"
                draggable="false"
              />
            </div>
            <form method="post" onSubmit={login}>
              <InputGA
                name="E-mail"
                value={email}
                setValue={setEmail}
                placeholder="Въведете вашия имейл"
                id="email"
                type="email"
              />

              <InputGA
                name="Парола"
                value={password}
                setValue={setPassword}
                placeholder="Въведете вашата парола"
                id="password"
                type="password"
              />

              <button
                type="submit"
                className="btn btn-danger w-100"
                style={{ fontWeight: "bold" }}
              >
                Влез
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
