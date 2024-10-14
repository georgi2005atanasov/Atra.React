import { useState } from "react";
import { Api as IdentityApi } from "../../../services/Identity/Api.js";
import "./Login.css";
import InputGA from "../../../components/Common/InputGA.jsx";
import AuthenticationLayout from "../AuthenticationLayout.jsx";

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

  return (
    <AuthenticationLayout header={"Вход"}>
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
    </AuthenticationLayout>
  );
};

export default Login;
