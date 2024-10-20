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

    if (!response.accessToken) {
      throw new Error("Невалиден потребител!");
    }

    Storage.setAccessToken(response.accessToken);

    return response;
  };
}

export { Api as IdentityApi };
