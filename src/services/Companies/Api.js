import ApiAbstract, { METHOD } from "../ApiAbstract";

// acting as pseudo storage; not secure for the real world
class Api extends ApiAbstract {
  controllerName = "Company";

  static get = () => new Api();

  create = async (data) =>
    this.execute({
      endpoint: "Create",
      method: METHOD.POST,
      body: data,
    });

  all = async (params) =>
    this.execute({
      endpoint: "All",
      method: METHOD.GET,
      params: params,
    });

  delete = async (id) =>
    this.execute({
      endpoint: `Delete/${id}`,
      method: METHOD.DELETE,
    });
}

export { Api as CompaniesApi };
