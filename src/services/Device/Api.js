import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Device";

  static get = () => new Api();

  pair = async () =>
    this.execute({
      endpoint: "Pair",
      method: METHOD.POST,
      isAuthorized: false,
      body: JSON.stringify(data),
    });
}

export { Api as DeviceApi };
