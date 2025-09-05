import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home.jsx";
import UserPage from "./pages/user.jsx";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import { ProductPage } from "./pages/products.jsx";

import { AuthWrapper } from "./components/context/auth.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />
      },
      {
        path: "user",
        element: <UserPage />,
      },

    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>
);