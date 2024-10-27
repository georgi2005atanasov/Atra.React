import Root from "./pages/Root/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Verify from "./pages/Auth/Verify/Verify.jsx";
import Start, { loader as loadStart } from "./pages/Auth/Start/Start.jsx";
import Onboarding, { loader as loadOnboarding } from "./pages/Auth/Onboarding/Onboarding.jsx";
import Login, {loader as loadLogin} from "./pages/Auth/Login/Login.jsx";
import PrivateRoot from "./pages/Root/PrivateRoot.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Start />, loader: loadStart },
      { path: "login", element: <Login />, loader: loadLogin },
      { path: "verify", element: <Verify /> },
      { path: "onboarding", element: <Onboarding />, loader: loadOnboarding },
      { index: "dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "/private",
    element: <PrivateRoot />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
    ],
  }
]);

function App() {
  return (
    <div id="root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
