import Login from "./pages/Auth/Login/Login.jsx";
import Onboarding from "./pages/Auth/Onboarding/Onboarding.jsx";
import Splash from "./pages/Splash/Splash.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
    children: [
      { path: "login", element: <Login />},
      { path: "onboarding", element: <Onboarding />},
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
