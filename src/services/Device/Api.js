import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Device";

  static get = () => new Api();

  pair = async (data) =>
    this.execute({
      endpoint: "Pair",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

  requireAuth = async (data) =>
    this.execute({
      endpoint: "RequireAuth",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });
}

export { Api as DeviceApi };
