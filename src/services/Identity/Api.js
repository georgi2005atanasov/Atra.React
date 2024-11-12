import ApiAbstract, { METHOD } from "../ApiAbstract.js";
import Storage from "../../utils/storage/Storage.js";

class Api extends ApiAbstract {
  controllerName = "Identity";

  static get = () => new Api();

  login = async (data) => {
    const response = await this.execute({
      endpoint: "Login",
      method: METHOD.POST,
      body: data,
    });

    if (!response.success)
      throw new Error("Невалиден потребител!");

    return response;
  };

  logout = async (data) => {
    await this.execute({
      endpoint: "Logout",
      method: METHOD.POST,
      body: data,
    });
  };

  sendPasswordReset = async (data) =>
    this.execute({
      endpoint: "SendPasswordReset",
      method: METHOD.POST,
      body: data,
    });

  resetPassword = async (token, email, data) =>
    this.execute({
      endpoint: `ResetPassword?token=${encodeURIComponent(
        token
      )}&email=${encodeURIComponent(email)}`,
      method: METHOD.POST,
      body: data,
    });
}

export { Api as IdentityApi };
