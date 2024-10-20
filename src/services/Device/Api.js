import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Device";

  static get = () => new Api();

  requireAuth = async (data) =>
    this.execute({
      endpoint: "RequireAuth",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

  pair = async (data) =>
    this.execute({
      endpoint: "Pair",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

  sendTOTP = async (data) =>
    this.execute({
      endpoint: "SendTOTP",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });
}

export { Api as DeviceApi };
