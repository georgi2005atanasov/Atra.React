import ApiAbstract, { METHOD } from "../ApiAbstract.js";
import SecureStorage from "../../utils/storage/Storage.js";

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

    SecureStorage.setAccessToken(response.accessToken);

    return response;
  };

  // register = async (email, password, name) => {
  //     const response = await this.execute({
  //         endpoint: "Register",
  //         method: METHOD.POST,
  //         isAuthorized: false,
  //         body: { email, password, name, ...getDeviceData() },
  //     });

  //     if (response.accessToken) {
  //         await SecureStorage.setAccessToken(response.accessToken);
  //     }

  //     return response;
  // };
}

export { Api };
