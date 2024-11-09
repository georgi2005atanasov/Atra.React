import BackButtonGA from "../../../components/Common/BackButtonGA";
import { redirect } from "react-router-dom";
import { DetailsApi } from "../../../services/Detail/Api";
import { CompaniesApi } from "../../../services/Companies/Api";
import DetailForm from "../Form/DetailForm";

const Info = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>
      <h2 className="text-center my-3 pb-2 border-bottom border-1 border-danger">
        Инфо Детайл
      </h2>

      <DetailForm />
    </div>
  );
};

export async function loader({ request, params }) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const detailId = params.id;
    const resCompanies = await CompaniesApi.get().all();
    const detail = await DetailsApi.get().getById(detailId);
    console.log(detail);

    return {
      category,
      suppliers: resCompanies.data.items,
      detail,
    };
  } catch {
    return redirect("/");
  }
}

export default Info;
