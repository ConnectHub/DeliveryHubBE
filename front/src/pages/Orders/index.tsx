import { useQuery } from 'react-query';
import DataTable from '../../components/DataTable';
import { getOrders } from './api';
import { columns } from './components/columns';

function OrdersPage() {
  const { isLoading, error, data } = useQuery('orderData', getOrders);

  if (error) return <div>error</div>;

  return <DataTable data={data ?? []} columns={columns} />;
}

export default OrdersPage;
