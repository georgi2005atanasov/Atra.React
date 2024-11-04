import ApiAbstract, { METHOD } from "../ApiAbstract.js";
import Storage from "../../utils/storage/Storage.js";

class Api extends ApiAbstract {
  controllerName = "Identity";

  static get = () => new Api();

  login = async (data) => {
    const response = await this.execute({
      endpoint: "Login",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

    if (response.error && response.error != null)
      throw new Error("Невалиден потребител!");

    Storage.setAccessToken(response.data.accessToken);
    Storage.setUserName(response.data.userName);

    return response.data.userName;
  };

  logout = async (data) => {
    await this.execute({
      endpoint: "Logout",
      method: METHOD.POST,
      body: data,
    });

    Storage.setAccessToken("");
  };

  sendPasswordReset = async (data) =>
    this.execute({
      endpoint: "SendPasswordReset",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

  resetPassword = async (token, email, data) =>
    this.execute({
      endpoint: `ResetPassword?token=${encodeURIComponent(
        token
      )}&email=${encodeURIComponent(email)}`,
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });
}

export { Api as IdentityApi };
