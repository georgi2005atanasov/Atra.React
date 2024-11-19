import { redirect } from "react-router-dom";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import { INITIAL_FORM_STATE } from "../Form/constants";
import ProductForm from "../Form/ProductForm";

const Add = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="row d-flex">
        <div className="col-md-3 d-flex p-0">
          <BackButtonGA />
        </div>
        <div className="offset-md-2"></div>
        <h2 className="col-12 d-flex text-center my-3 pb-2 border-bottom border-1 border-danger">
          Добави продукт
        </h2>
      </div>

      <ProductForm />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  try {
    const formData = INITIAL_FORM_STATE;

    return {
      formData,
      productId: undefined,
    };
  } catch {
    return redirect("/");
  }
}

export default Add;
