import { useState } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORY_LABELS } from "../Form/constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ProductsApi } from "../../../services/Product/Api";
import BackButtonGA from "../../../components/Common/BackButtonGA";
import { base64ToFile } from "../../../utils/commonUtils";
import { renderBase64Image } from "../../../utils/renderers";

const Info = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { product } = useLoaderData();

  if (!product) return null;

  const handleDelete = async () => {
    try {
      await ProductsApi.get().delete(product.id);
      navigate("/private/products/all");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setOpenDialog(false);
  };

  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>

      <h2 className="text-center my-3 pb-2 border-bottom border-2 border-danger">
        Инфо Продукт
      </h2>

      <div className="row mt-4 g-4">
        <div className="col-md-6">
          <div className="card border border-2 h-100">
            <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
              <h4 className="mb-0 text-danger">Основна информация</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped table-bordered mb-0">
                <tbody>
                  <tr>
                    <th className="w-25 bg-light">Име:</th>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Категория:</th>
                    <td>{PRODUCT_CATEGORY_LABELS[product.category]}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Цена труд:</th>
                    <td>{product.labourPrice?.toFixed(2)} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Цена без труд:</th>
                    <td>{product.priceWithoutLabour?.toFixed(2)} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Обща цена:</th>
                    <td>{product.totalPrice?.toFixed(2)} лв.</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Създаден на:</th>
                    <td>{product.createdOn}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Създаден от:</th>
                    <td>{product.createdBy}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Променен на:</th>
                    <td>{product.modifiedOn}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Променен от:</th>
                    <td>{product.modifiedBy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {product.detailsPrices?.length > 0 && (
            <div className="card border border-2 mb-4">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">Детайли</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Име</th>
                        <th>Мер. единица</th>
                        <th>Количество</th>
                        <th>Ед. цена</th>
                        <th>Общо</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.detailsPrices.map((detail, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              className="text-danger"
                              to={`/private/details/info/${detail.detailId}`}
                            >
                              {detail.detailName}
                            </Link>
                          </td>
                          <td>{detail.unit}</td>
                          <td className="text-end">{detail.count}</td>
                          <td className="text-end">
                            {detail.price?.toFixed(2)} лв.
                          </td>
                          <td className="text-end">
                            {(detail.price * detail.count)?.toFixed(2)} лв.
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {product.components?.length > 0 && (
            <div className="card border border-2">
              <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
                <h4 className="mb-0 text-danger">Компоненти</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Име</th>
                        <th>Количество</th>
                        <th>Цена труд</th>
                        <th>Цена без труд</th>
                        <th>Общо</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.components.map((component, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              className="text-danger"
                              to={`/private/components/info/${component.id}`}
                            >
                              {component.name}
                            </Link>
                          </td>
                          <td className="text-end">{component.count}</td>
                          <td className="text-end">
                            {component.labourPrice?.toFixed(2)} лв.
                          </td>
                          <td className="text-end">
                            {component.priceWithoutLabour?.toFixed(2)} лв.
                          </td>
                          <td className="text-end">
                            {component.totalPrice?.toFixed(2)} лв.
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

      {product.image && (
        <div className="card border border-2 mt-4">
          <div className="card-header bg-danger bg-opacity-10 border-bottom border-danger">
            <h4 className="mb-0 text-danger">Изображение</h4>
          </div>
          <div className="card-body text-center">
            <img
              src={renderBase64Image(product.image)}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(`/private/products/update/${product.id}`)}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Потвърждение за изтриване</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Сигурни ли сте, че искате да изтриете този продукт?
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
    const productId = params.id;
    const resDetail = await ProductsApi.get().getById(productId);

    return {
      product: resDetail.data.product,
    };
  } catch {
    return redirect("/");
  }
}

export default Info;
