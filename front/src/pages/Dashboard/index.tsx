import BarChart from '../../components/BarChart';
import InformationCard from '../../components/InformationCard';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import {
  useGetOrderByStatus,
  useGetTotalOrdersDelivered,
  useGetTotalResidents,
  useGetTotalOrdersPending,
  useGetOrdersByMonth,
  useGetOrdersByCondominium,
} from './api/service';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext.tsx';
import {useTranslation} from "react-i18next";

function DashboardPage() {
  const { data: ordersDelivered } = useGetTotalOrdersDelivered();
  const { data: countResidents } = useGetTotalResidents();
  const { data: ordersPending } = useGetTotalOrdersPending();
  const { role } = useContext(AuthContext).user;

  const { t } = useTranslation('common');

  return (
    <>
      <h1 className="pb-4 text-4xl text-left">Dashboard</h1>

      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col p-2 sm:flex-row gap-7">
          <InformationCard
            description={t('dashboard.totalDeliveredOrders')}
            total={ordersDelivered ?? 0}
            backgroundColor="bg-green-500"
          />
          <InformationCard
            description={t('dashboard.totalResidents')}
            total={countResidents ?? 0}
            backgroundColor="bg-blue-600"
          />
          <InformationCard
            description={t('dashboard.totalPendingOrders')}
            total={ordersPending ?? 0}
            backgroundColor="bg-zinc-700"
          />
        </div>

        <div className="flex flex-col gap-10 p-2 xl:flex-row">
          <PieChart
            title={t('dashboard.deliveriesByStatus')}
            queryFunction={useGetOrderByStatus}
          />
          <LineChart
              title={t('dashboard.deliveriesByMonth')}
            queryFunction={useGetOrdersByMonth}
          />
        </div>

        {role === 'admin' && (
          <div className="p-2">
            <BarChart
              title="Entregas por condomínio"
              queryFunction={useGetOrdersByCondominium}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardPage;
