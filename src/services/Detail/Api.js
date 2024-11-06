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

  all = async (params) => 
    this.execute({
    endpoint: "All",
    method: METHOD.GET,
    params
  });
}

export { Api as DetailsApi };
