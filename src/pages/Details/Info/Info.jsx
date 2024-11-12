/* eslint-disable react/prop-types */
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import {
  Category,
  CATEGORY_LABELS,
  MATERIAL_LABELS,
  PRICE_UNIT_LABELS,
} from "../../../pages/Details/Form/constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { DetailsApi } from "../../../services/Detail/Api";
import { renderBase64Image } from "../../../utils/renderers";
import { CompaniesApi } from "../../../services/Companies/Api";

const Info = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { formData } = useLoaderData();

  const goToUpdateDetail = () =>
    navigate(`/private/details/update/${formData.id}`);

  const handleDelete = async () => {
    try {
      await DetailsApi.get().delete(formData.id);
      navigate("/details");
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
    setOpenDialog(false);
  };

  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>

      <h2 className="text-center my-3 pb-2 border-bottom border-2 border-danger">
        Инфо Детайл
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
                    <td>{formData.name}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Номер на детайл:</th>
                    <td>{formData.detailNumber}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">АТРА номер:</th>
                    <td>{formData.atraNumber}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Доставчик:</th>
                    <td>{formData.supplierName}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Категория:</th>
                    <td>{CATEGORY_LABELS[formData.category]}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">ДДС:</th>
                    <td>{formData.hasVAT ? "Да" : "Не"}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Цена труд:</th>
                    <td>{formData.labourPrice} лв.</td>
                  </tr>
                </tbody>
              </table>

              {formData.description && (
                <div className="mt-4">
                  <h5 className="text-danger border-bottom border-danger pb-2">
                    Описание
                  </h5>
                  <p className="text-break">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* Prices Card */}
          {formData.prices && formData.prices.length > 0 && (
            <div className="card border border-2 mb-4">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">Цени</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Цена</th>
                        <th>Тегло</th>
                        <th>Мерна единица</th>
                        {formData.category === Category.Metal && (
                          <>
                            <th>Дебелина</th>
                            <th>Ширина</th>
                            <th>Височина</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.prices.map((price, index) => (
                        <tr key={index}>
                          <td className="text-end">{price.price} лв.</td>
                          <td className="text-end">{price.weight ?? "-"} гр.</td>
                          <td>{PRICE_UNIT_LABELS[price.unit]}</td>
                          {formData.category === Category.Metal && (
                            <>
                              <td className="text-end">
                                {price.metalDimensions?.thickness
                                  ? `${price.metalDimensions.thickness} мм`
                                  : "-"}
                              </td>
                              <td className="text-end">
                                {price.metalDimensions?.width
                                  ? `${price.metalDimensions.width} мм`
                                  : "-"}
                              </td>
                              <td className="text-end">
                                {price.metalDimensions?.height
                                  ? `${price.metalDimensions.height} мм`
                                  : "-"}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Extra Characteristics Card */}
          {formData.extraCharacteristics && (
            <div className="card border border-2 mb-4">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">
                  Допълнителни характеристики
                </h4>
              </div>
              <div className="card-body p-0">
                <table className="table table-striped table-bordered mb-0">
                  <tbody>
                    {Object.entries(formData.extraCharacteristics).map(
                      ([key, value]) => {
                        if (!value) return null;
                        const label = {
                          material: "Материал",
                          dieNumber: "Номер щанца",
                          benderNumber: "Номер огъвач",
                          step: "Стъпка",
                          layout: "Разположение",
                          detailsPerHit: "Детайли на удар",
                          detailsPerSheet: "Детайли на лист",
                          din: "DIN",
                          pressMold: "Пресформа",
                          pressMoldSizes: "Размери пресформа",
                          castingMachine: "Машина за леене",
                          cleaning: "Почистване",
                          finishing: "Финишна",
                          thicknessValue: "Дебелина",
                          sizes: "Размери",
                        }[key];

                        if (!label) return null;

                        return (
                          <tr key={key}>
                            <th className="w-50 bg-light">{label}:</th>
                            <td>
                              {key === "material"
                                ? MATERIAL_LABELS[value]
                                : value}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* History Card */}
          <div className="card border border-2">
            <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
              <h4 className="mb-0 text-danger">История</h4>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped table-bordered mb-0">
                <tbody>
                  <tr>
                    <th className="w-50 bg-light">Създаден на:</th>
                    <td>{formData.createdOn}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Създаден от:</th>
                    <td>{formData.createdBy}</td>
                  </tr>
                  {formData.modifiedOn && (
                    <>
                      <tr>
                        <th className="bg-light">Променен на:</th>
                        <td>{formData.modifiedOn}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Променен от:</th>
                        <td>{formData.modifiedBy}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      {formData.image && (
        <div className="card border border-2 mt-4">
          <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
            <h4 className="mb-0 text-danger">Изображение</h4>
          </div>
          <div className="card-body text-center">
            <img
              src={renderBase64Image(formData.image)}
              alt={formData.name}
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button variant="contained" color="warning" onClick={goToUpdateDetail}>
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
            Сигурни ли сте, че искате да изтриете този детайл?
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

export async function loader({ request, params }) {
  try {
    const url = new URL(request.url);
    const resCompanies = await CompaniesApi.get().all();
    const category = url.searchParams.get("category");
    const detailId = params.id;
    const resDetail = await DetailsApi.get().getById(detailId);

    return {
      category,
      formData: resDetail.data.detail,
      companies: resCompanies.data,
    };
  } catch {
    return redirect("/");
  }
}

export default Info;
