import { useState } from "react";
import { Api as IdentityApi } from "../../services/Identity/Api.js";
import logo from "../../assets/atraLogo.png";
import "./Login.css";
import SecureStorage from "../../utils/storage/SecureStorage.js";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const pair = async (event) => {
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
          <header className="non-selectable text-center card d-flex justify-content-center align-items-center">
            <h1>Сдвояване</h1>
          </header>
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
            <form method="post" onSubmit={pair}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="non-selectable">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control non-selectable"
                  id="email"
                  placeholder="Въведете вашия имейл"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="non-selectable">
                  Повтори парола
                </label>
                <input
                  type="password"
                  className="form-control non-selectable"
                  id="password"
                  placeholder="Въведете вашата парола"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="non-selectable">
                  Парола
                </label>
                <input
                  type="password"
                  className="form-control non-selectable"
                  id="password"
                  placeholder="Въведете вашата парола"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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

export default Onboarding;
