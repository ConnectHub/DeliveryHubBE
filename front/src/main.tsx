import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
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
import SignOrderPage from './pages/SignOrder/index.tsx';
import OrderConfirmedPage from './pages/SignOrder/components/OrderConfirmed/index.tsx';
import Layout from './components/Layout/index.tsx';
import NotFoundPage from './pages/NotFound/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/residents" element={<ResidentsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
      <Route path="/sign-order">
        <Route path=":url" element={<SignOrderPage />} />
        <Route path="order-confirmed" element={<OrderConfirmedPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored" position="bottom-right" />
      {/* <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
      </ConfigProvider> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
