import { redirect } from "react-router-dom";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import ComponentForm from "../Form/ComponentForm";
import { INITIAL_FORM_STATE } from "../Form/constants";
import { ComponentApi } from "../../../services/Component/Api";

const Update = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="row d-flex">
        <div className="col-md-3 d-flex p-0">
          <BackButtonGA />
        </div>
        <div className="offset-md-2"></div>
        <h2 className="col-12 d-flex text-center my-3 pb-2 border-bottom border-1 border-danger">
          Обнови Компонент
        </h2>
      </div>
      <ComponentForm />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  try {
    const componentId = parseInt(params.id);
    const resComponent = await ComponentApi.get().getById(componentId);

    return {
      formData: resComponent.data,
      componentId,
    };
  } catch {
    return redirect("/");
  }
}

export default Update;
