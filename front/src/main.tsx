import 'react-toastify/dist/ReactToastify.css';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ResidentsPage from './pages/Residents/index.tsx';
import OrdersPage from './pages/Orders/index.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import OrderConfirmedPage from './pages/SignOrder/components/OrderConfirmed/index.tsx';

const SignOrderPage = lazy(() => import('./pages/SignOrder/index.tsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/residents" element={<ResidentsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/sign-order/:url" element={<SignOrderPage />} />
      <Route
        path="/sign-order/order-confirmed"
        element={<OrderConfirmedPage />}
      />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored" position="bottom-right" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
