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
  loader as detailInfoLoader
} from "./pages/Details/Info/Info.jsx";

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
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "details/add",
        element: <AddDetail />,
        loader: detailFormLoader,
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
