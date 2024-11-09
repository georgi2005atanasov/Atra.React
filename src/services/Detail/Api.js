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

  getById = async (id) => 
    this.execute({
    endpoint: `GetById/${id}`,
    method: METHOD.GET,
  });

  update = async (id, formData) => 
    this.execute({
    endpoint: `Update/${id}`,
    method: METHOD.POST,
    body: formData,
  });
}

export { Api as DetailsApi };
