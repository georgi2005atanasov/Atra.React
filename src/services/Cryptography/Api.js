import ApiAbstract, { METHOD } from "../ApiAbstract";

// acting as pseudo storage; not secure for the real world
class Api extends ApiAbstract {
  controllerName = "Cryptography";

  static get = () => new Api();

  sign = async (data) =>
    this.execute({
      endpoint: "Sign",
      method: METHOD.POST,
      body: data,
    });
}

export { Api as CryptographyApi };
