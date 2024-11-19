import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_CATEGORY_LABELS } from "../Form/constants";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ProductsApi } from "../../../services/Product/Api";
import BackButtonGA from "../../../components/Common/BackButtonGA";

// const dummyProduct = {
//     id: 1,
//     name: "Метална врата Classic",
//     category: 0, // Assuming 0 is for Metal category
//     labourPrice: 250.00,
//     priceWithoutLabour: 1200.50,
//     totalPrice: 1450.50,
//     createdOn: "19.11.2024",
//     image: "base64String...",
//     detailsPrices: [
//       {
//         detailName: "Метален лист 2мм",
//         detailId: 1,
//         priceId: 1,
//         unit: "м2",
//         price: 45.50,
//         weight: 15.7,
//         count: 4
//       },
//       {
//         detailName: "Панта усилена",
//         detailId: 2,
//         priceId: 2,
//         unit: "бр",
//         price: 12.30,
//         count: 3
//       }
//     ],
//     components: [
//       {
//         id: 1,
//         name: "Брава комплект",
//         count: 1,
//         labourPrice: 50.00,
//         priceWithoutLabour: 180.00,
//         totalPrice: 230.00
//       },
//       {
//         id: 2,
//         name: "Каса",
//         count: 1,
//         labourPrice: 100.00,
//         priceWithoutLabour: 320.00,
//         totalPrice: 420.00
//       }
//     ]
//   };

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [product, setProduct] = useState(dummyProduct);

  useEffect(() => {
    // const fetchProduct = async () => {
    //   try {
    //     const response = await ProductsApi.get().getById(id);
    //     setProduct(response.data);
    //   } catch (ex) {
    //     console.log(ex);
    //     navigate("/");
    //   }
    // };
    // fetchProduct();
  }, []);

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
                          <td>{detail.detailName}</td>
                          <td>{detail.unit}</td>
                          <td className="text-end">{detail.count}</td>
                          <td className="text-end">{detail.price?.toFixed(2)} лв.</td>
                          <td className="text-end">{(detail.price * detail.count)?.toFixed(2)} лв.</td>
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
                          <td>{component.name}</td>
                          <td className="text-end">{component.count}</td>
                          <td className="text-end">{component.labourPrice?.toFixed(2)} лв.</td>
                          <td className="text-end">{component.priceWithoutLabour?.toFixed(2)} лв.</td>
                          <td className="text-end">{component.totalPrice?.toFixed(2)} лв.</td>
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
              src={product.image}
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

export default Info;