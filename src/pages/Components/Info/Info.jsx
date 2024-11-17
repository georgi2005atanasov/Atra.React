import { useState } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import { PRICE_UNIT_LABELS } from "../../../pages/Details/Form/constants";
import { renderBase64Image } from "../../../utils/renderers";
import { ComponentApi } from "../../../services/Component/Api";

const Info = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { component } = useLoaderData();

  const handleDelete = async () => {
    try {
      // Implement delete functionality
      await ComponentApi.get().delete(component.id);
      navigate("/private/components/all", { replace: true });
    } catch (error) {
      console.error("Error deleting component:", error);
    }
    setOpenDialog(false);
  };

  const goToUpdateComponent = () =>
    navigate(`/private/components/update/${component.id}`);

  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>

      <h2 className="text-center my-3 pb-2 border-bottom border-2 border-danger">
        Инфо Компонент
      </h2>

      <div className="row mt-4 g-4">
        {/* Left Column */}
        <div className="col-md-6">
          {/* Basic Info Card */}
          <div className="card border border-2 h-100">
            <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
              <h4 className="mb-0 text-danger">Основна информация</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped table-bordered mb-0">
                <tbody>
                  <tr>
                    <th className="w-25 bg-light">Име:</th>
                    <td>{component.name}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Цена труд:</th>
                    <td>{component.labourPrice} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Цена без труд:</th>
                    <td>{component.priceWithoutLabour} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Общо:</th>
                    <td>{component.priceWithoutLabour + component.labourPrice} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Създаден на:</th>
                    <td>{component.createdOn}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          {/* Details Prices Card */}
          {component.detailsPrices && component.detailsPrices.length > 0 && (
            <div className="card border border-2 mb-4">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">Детайли и цени</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Детайл</th>
                        <th>Цена</th>
                        <th>Брой</th>
                        <th>Мерна единица</th>
                        <th>Тегло</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.detailsPrices.map((price, index) => (
                        <tr key={index}>
                          <td>
                            {price.priceId ? (
                              <Link
                                to={`/private/details/info/${price.detailId}`}
                                className="text-danger text-decoration-underline hover-underline"
                                style={{
                                  transition: "all 0.2s ease-in-out",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.color = "#0056b3";
                                  e.target.style.textDecoration = "underline";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.color = "#0d6efd";
                                  e.target.style.textDecoration = "none";
                                }}
                              >
                                {price.detailName}
                              </Link>
                            ) : (
                              price.detailName
                            )}
                          </td>
                          <td className="text-end">{price.price} лв.</td>
                          <td className="text-end">{price.count}</td>
                          <td>
                            {price.unit !== null
                              ? PRICE_UNIT_LABELS[price.unit]
                              : "-"}
                          </td>
                          <td className="text-end">{price.weight ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Metal Dimensions Card (if any detail has metal dimensions) */}
          {component.detailsPrices.some((detail) => detail.metalDimensions) && (
            <div className="card border border-2">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">Размери на метални детайли</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Детайл</th>
                        <th>Дебелина</th>
                        <th>Ширина</th>
                        <th>Височина</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.detailsPrices
                        .filter((detail) => detail.metalDimensions)
                        .map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.detailName}</td>
                            <td className="text-end">
                              {detail.metalDimensions?.thickness
                                ? `${detail.metalDimensions.thickness} мм`
                                : "-"}
                            </td>
                            <td className="text-end">
                              {detail.metalDimensions?.width
                                ? `${detail.metalDimensions.width} мм`
                                : "-"}
                            </td>
                            <td className="text-end">
                              {detail.metalDimensions?.height
                                ? `${detail.metalDimensions.height} мм`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Section */}
      {component.image && (
        <div className="card border border-2 mt-4">
          <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
            <h4 className="mb-0 text-danger">Изображение</h4>
          </div>
          <div className="card-body text-center">
            <img
              src={renderBase64Image(component.image)}
              alt={component.name}
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      )}

      {/* Details Images Gallery */}
      {component.detailsPrices.some((detail) => detail.image) && (
        <div className="card border border-2 mt-4">
          <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
            <h4 className="mb-0 text-danger">Изображения на детайли</h4>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {component.detailsPrices
                .filter((detail) => detail.image)
                .map((detail, index) => (
                  <div key={index} className="col-md-4 col-lg-3">
                    <div className="card">
                      <img
                        src={renderBase64Image(detail.image)}
                        alt={detail.detailName}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <h6 className="card-title text-center">
                          {detail.detailName}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button
          variant="contained"
          color="warning"
          onClick={goToUpdateComponent}
        >
          Обнови
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenDialog(true)}
        >
          Изтрий
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете този компонент?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Отказ
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  try {
    const detailId = params.id;
    const resDetail = await ComponentApi.get().getById(detailId);

    return {
      component: resDetail.data.component,
    };
  } catch {
    return redirect("/");
  }
}

export default Info;
