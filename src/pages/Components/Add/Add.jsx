import BackButtonGA from "../../../components/Common/BackButtonGA";
import ComponentForm from "../Form/ComponentForm";

const Add = () => {
  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="row d-flex">
        <div className="col-md-3 d-flex p-0">
          <BackButtonGA />
        </div>
        <div className="offset-md-2"></div>
        <h2 className="col-12 d-flex text-center my-3 pb-2 border-bottom border-1 border-danger">
          Добави Компонент
        </h2>
      </div>
      <ComponentForm />;
    </div>
  );
};

export default Add;
