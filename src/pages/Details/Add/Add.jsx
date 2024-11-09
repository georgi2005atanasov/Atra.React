import BackButtonGA from "../../../components/Common/BackButtonGA";
import { redirect } from "react-router-dom";
import DetailForm from "../Form/DetailForm";
import { CompaniesApi } from "../../../services/Companies/Api";

const Add = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>
      <h2 className="text-center my-3 pb-2 border-bottom border-1 border-danger">
        Добави Детайл
      </h2>

      <DetailForm />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const response = await CompaniesApi.get().all();

    return {
      category,
      suppliers: response.data.items,
    };
  } catch {
    return redirect("/");
  }
}

export default Add;
