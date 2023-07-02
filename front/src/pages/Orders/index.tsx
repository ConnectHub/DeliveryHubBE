import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable';
import { getOrders } from './api';
import NavBar from '../../components/Layout';
import { columns } from './components/columns';
import Modal from '../../components/Modal';

function OrdersPage() {
  const { isLoading, error, data } = useQuery('orderData', getOrders);

  const orders =
    data?.map((order) => ({
      key: order.id,
      ...order,
    })) ?? [];

  if (error) return <div>error</div>;

  return <DataTable data={orders} columns={columns} />;
}

export default OrdersPage;
