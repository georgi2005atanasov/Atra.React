import BackButtonGA from "../../../components/Common/BackButtonGA";
import { redirect } from "react-router-dom";
import { DetailsApi } from "../../../services/Detail/Api";
import { CompaniesApi } from "../../../services/Companies/Api";
import DetailForm from "../Form/DetailForm";

const Update = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="row d-flex">
        <div className="col-md-3 d-flex p-0">
          <BackButtonGA />
        </div>
        <div className="offset-md-2"></div>
        <h2 className="col-12 d-flex text-center my-3 pb-2 border-bottom border-1 border-danger">
          Обнови Детайл
        </h2>
      </div>

      <DetailForm />
    </div>
  );
};

export async function loader({ params }) {
  try {
    // GETTING IT AS STRING
    const detailId = parseInt(params.id);
    const resCompanies = await CompaniesApi.get().all();
    const resDetail = await DetailsApi.get().getById(detailId);

    return {
      category: resDetail.data.detail.category,
      suppliers: resCompanies.data.items,
      formData: resDetail.data.detail,
      detailId,
    };
  } catch {
    return redirect("/");
  }
}

export default Update;
