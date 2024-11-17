import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Component";

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
      params,
    });

  update = async (id, formData) =>
    this.execute({
      endpoint: `Update/${id}`,
      method: METHOD.PUT,
      body: formData,
    });

  getById = async (id) =>
    this.execute({
      endpoint: `GetById/${id}`,
      method: METHOD.GET,
    });

  delete = async (id) =>
    this.execute({
      endpoint: `Delete/${id}`,
      method: METHOD.DELETE,
    });

  //   allEssentials = async (params) =>
  //     this.execute({
  //     endpoint: "AllEssentials",
  //     method: METHOD.GET,
  //     params,
  //   });

  //   getPricesById = async (id) =>
  //     this.execute({
  //     endpoint: `GetPricesById/${id}`,
  //     method: METHOD.GET,
  //   });
}

export { Api as ComponentApi };
