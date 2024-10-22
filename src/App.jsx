import Login from "./pages/Auth/Login/Login.jsx";
import Start, { loader as loadStart } from "./pages/Auth/Start/Start.jsx";
import Root from "./pages/Root/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Verify from "./pages/Auth/Verify/Verify.jsx";
import Onboarding, {
  loader as loadEmail,
} from "./pages/Auth/Onboarding/Onboarding.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Start />, loader: loadStart },
      { path: "login", element: <Login /> },
      { path: "verify", element: <Verify /> },
      { path: "onboarding", element: <Onboarding />, loader: loadEmail },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
