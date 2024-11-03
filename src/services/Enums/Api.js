import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Enums";

  static get = () => new Api();

  getDetailEnums = async () =>
    this.execute({
      endpoint: "GetDetailEnums",
      method: METHOD.GET,
    });
}

export { Api as EnumsApi };
