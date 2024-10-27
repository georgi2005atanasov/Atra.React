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

    if (!response.data || !response.data.accessToken) {
      if (response.error)
        throw new Error(response.error);
      throw new Error("Невалиден потребител!");
    }

    Storage.setAccessToken(response.data.accessToken);

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

  resetPassword = async (token, data) =>
    this.execute({
      endpoint: `ResetPassword?token=${token}`,
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });
}

export { Api as IdentityApi };
