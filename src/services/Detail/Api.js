import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Detail";

  static get = () => new Api();

  create = async (formData) => 
    this.execute({
    endpoint: "Create",
    method: METHOD.POST,
    body: formData,
  });
}

export { Api as DetailsApi };
