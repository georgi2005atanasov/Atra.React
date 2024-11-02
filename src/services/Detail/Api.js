import AtraError from "../../AtraError.js";
import Storage from "../../utils/storage/Storage.js";
import ApiAbstract, { METHOD } from "../ApiAbstract.js";

class Api extends ApiAbstract {
  controllerName = "Details";

  static get = () => new Api();

  // create
}

export { Api as DetailsApi };
