import { api } from '../../../../services/api';
import { ChartData } from '../../interfaces';

async function getOrderByStatus(): Promise<ChartData[]> {
  return (await api.get('/dashboard/listOrdersByStatus')).data;
}

async function getTotalOrdersDelivered(): Promise<number> {
  return (await api.get('/dashboard/totalOrdersDelivered')).data;
}

async function getTotalResidents(): Promise<number> {
  return (await api.get('/dashboard/totalResidents')).data;
}

async function getTotalOrdersPending() {
  return (await api.get('/dashboard/totalOrdersPending')).data;
}

async function getOrderByMonth(): Promise<ChartData[]> {
  return (await api.get('/dashboard/listOrdersByMonths')).data;
}
async function getOrderByCondominium(): Promise<ChartData[]> {
  return (await api.get('/dashboard/listOrdersByCondominium')).data;
}

export function dashboardRepository() {
  return {
    getOrderByStatus,
    getTotalOrdersDelivered,
    getTotalResidents,
    getTotalOrdersPending,
    getOrderByMonth,
    getOrderByCondominium,
  };
}
