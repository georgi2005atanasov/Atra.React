import BackButtonGA from "../../../components/Common/BackButtonGA";
import ProductForm from "../Form/ProductForm";

const Update = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="row d-flex">
        <div className="col-md-3 d-flex p-0">
          <BackButtonGA />
        </div>
        <div className="offset-md-2"></div>
        <h2 className="col-12 d-flex text-center my-3 pb-2 border-bottom border-1 border-danger">
          Обнови продукт
        </h2>
      </div>

      <ProductForm />
    </div>
  );
};

export default Update;