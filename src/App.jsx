import Login from "./pages/Login/Login.jsx";
import Splash from "./pages/Splash/Splash.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
    children: [{ path: "login", element: <Login />}],
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
