import AtraError from "../../AtraError.js";
import Storage from "../../utils/storage/Storage.js";
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

  pair = async (data) => {
    const r = await this.execute({
      endpoint: "Pair",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

    if (!r.data.deviceId) throw new AtraError(r.data.error, 400);

    Storage.setDeviceId(r.data.deviceId);
  };

  sendTOTP = async (data) =>
    this.execute({
      endpoint: "SendTOTP",
      method: METHOD.POST,
      isAuthorized: false,
      body: data,
    });

  verifyDevice = async (data) =>
    this.execute({
      endpoint: "VerifyDevice",
      method: METHOD.PUT,
      isAuthorized: false,
      body: data,
    });
}

export { Api as DeviceApi };
