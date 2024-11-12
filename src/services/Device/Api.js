import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Device";

  static get = () => new Api();

  requireAuth = async (data) =>
    this.execute({
      endpoint: "RequireAuth",
      method: METHOD.POST,
      body: data,
    });

  pair = async (data) =>
    await this.execute({
      endpoint: "Pair",
      method: METHOD.POST,
      body: data,
    });

  sendTOTP = async () =>
    this.execute({
      endpoint: "SendTOTP",
      method: METHOD.POST,
    });

  verifyDevice = async (data) =>
    this.execute({
      endpoint: "VerifyDevice",
      method: METHOD.PUT,
      body: data,
    });
}

export { Api as DeviceApi };
