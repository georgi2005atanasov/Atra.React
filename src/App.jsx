import Root from "./pages/Root/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Verify from "./pages/Auth/Verify/Verify.jsx";
import Start, { loader as loadStart } from "./pages/Auth/Start/Start.jsx";
import Onboarding, {
  loader as loadOnboarding,
} from "./pages/Auth/Onboarding/Onboarding.jsx";
import Login, { loader as loadLogin } from "./pages/Auth/Login/Login.jsx";
import PrivateRoot from "./pages/Root/PrivateRoot.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ResetPassword, {
  loader as resetPasswordLoader,
} from "./pages/Auth/ResetPassword/ResetPassword.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Unauthorized from "./pages/Errors/Unauthorized.jsx";
import ErrorsRoot from "./pages/Root/ErrorsRoot.jsx";
import Unhandled from "./pages/Errors/Unhandled.jsx";
import AllDetails, {
  loader as allDetailsLoader,
} from "./pages/Details/All/All.jsx";
import CompanyForm from "./pages/Companies/Form/CompanyForm.jsx";
import AllCompanies from "./pages/Companies/All.jsx";
import AddDetail, {
  loader as detailFormLoader,
} from "./pages/Details/Add/Add.jsx";
import DetailInfo, {
  loader as detailInfoLoader,
} from "./pages/Details/Info/Info.jsx";
import UpdateDetail, {
  loader as detailUpdateLoader,
} from "./pages/Details/Update/Update.jsx";
import AddComponent, {
  loader as addComponentLoader,
} from "./pages/Components/Add/Add.jsx";
import AllComponents from "./pages/Components/All/All.jsx";
import UpdateComponent, {
  loader as updateComponentLoader,
} from "./pages/Components/Update/Update.jsx";
import ComponentInfo, {
  loader as componentInfoLoader,
} from "./pages/Components/Info/Info.jsx";
import AllProducts, {
  loader as allProductsLoader,
} from "./pages/Products/All/All.jsx";
import ProductInfo, {
  loader as productInfoLoader,
} from "./pages/Products/Info/Info.jsx";
import AddProduct, {
  loader as addProductLoader,
} from "./pages/Products/Add/Add.jsx";
import UpdateProduct, {
  loader as updateProductLoader,
} from "./pages/Products/Update/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Start />, loader: loadStart },
      { path: "login", element: <Login />, loader: loadLogin },
      { path: "verify", element: <Verify /> },
      { path: "onboarding", element: <Onboarding />, loader: loadOnboarding },
      {
        path: "reset-password",
        element: <ResetPassword />,
        loader: resetPasswordLoader,
      },
    ],
  },
  {
    path: "/private",
    element: <PrivateRoot />,
    children: [
      {
        path: "dashboard",
        element: <AllProducts />,
        loader: allProductsLoader,
      },
      {
        path: "details/add",
        element: <AddDetail />,
        loader: detailFormLoader,
      },
      {
        path: "details/update/:id",
        element: <UpdateDetail />,
        loader: detailUpdateLoader,
      },
      {
        path: "details/info/:id",
        element: <DetailInfo />,
        loader: detailInfoLoader,
      },
      {
        path: "details/all",
        element: <AllDetails />,
        loader: allDetailsLoader,
      },
      {
        path: "companies/add",
        element: <CompanyForm />,
      },
      { path: "companies/all", element: <AllCompanies /> },
      {
        path: "components/add",
        element: <AddComponent />,
        loader: addComponentLoader,
      },
      {
        path: "components/update/:id",
        element: <UpdateComponent />,
        loader: updateComponentLoader,
      },
      {
        path: "components/info/:id",
        element: <ComponentInfo />,
        loader: componentInfoLoader,
      },
      {
        path: "components/all",
        element: <AllComponents />,
      },

      // not implemented
      {
        path: "products/add",
        element: <AddProduct />,
        loader: addProductLoader,
      },
      {
        path: "products/update/:id",
        element: <UpdateProduct />,
        loader: updateProductLoader,
      },
      {
        path: "products/info/:id",
        element: <ProductInfo />,
        loader: productInfoLoader,
      },
      {
        path: "products/all",
        element: <AllProducts />,
        loader: allProductsLoader,
      },
    ],
  },
  {
    path: "/errors",
    element: <ErrorsRoot />,
    children: [
      { index: true, element: <Unhandled /> },
      { path: "unauthorized", element: <Unauthorized /> },
    ],
    errorElement: <Unhandled />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
