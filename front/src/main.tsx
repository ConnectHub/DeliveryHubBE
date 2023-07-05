import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ResidentsPage from "./pages/Residents/index.tsx";
import OrdersPage from "./pages/Orders/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import SignOrderPage from "./pages/SignOrder/index.tsx";
import OrderConfirmedPage from "./pages/SignOrder/components/OrderConfirmed/index.tsx";
import Layout from "./components/Layout/index.tsx";
import NotFoundPage from "./pages/NotFound/index.tsx";
import LoginPage from "./pages/Login/index.tsx";
import UserContext from "./context/UserContext.tsx";
import ProtectedRouter from "./components/ProtectedRoute/index.tsx";
import CondominiumsPage from "./pages/Condominiums/index.tsx";
import DashboardPage from "./pages/Dashboard/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <DashboardPage />
            </ProtectedRouter>
          }
        />
        <Route
          path="/residents"
          element={
            <ProtectedRouter>
              <ResidentsPage />
            </ProtectedRouter>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRouter>
              <OrdersPage />
            </ProtectedRouter>
          }
        />
        <Route
          path="/condominiums"
          element={
            <ProtectedRouter>
              <CondominiumsPage />
            </ProtectedRouter>
          }
        />
      </Route>
      <Route path="/sign-order">
        <Route path=":url" element={<SignOrderPage />} />
        <Route path="order-confirmed" element={<OrderConfirmedPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored" position="bottom-right" />
      <UserContext>
        {/* <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
      we can use this to change the theme of antd to dark mode
      <RouterProvider router={router} />
      </ConfigProvider> */}
        <RouterProvider router={router} />
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);
