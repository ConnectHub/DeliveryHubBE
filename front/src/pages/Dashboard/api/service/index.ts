import { UseQueryResult, useQuery } from 'react-query';
import { dashboardRepository } from '../repository';
import { ChartData } from '../../interfaces';

export function useGetOrderByStatus(): UseQueryResult<ChartData[], Error> {
  return useQuery('ordersByStatus', dashboardRepository().getOrderByStatus);
}

export function useGetTotalOrdersDelivered() {
  return useQuery(
    'totalOrdersDelivered',
    dashboardRepository().getTotalOrdersDelivered,
  );
}

export function useGetTotalResidents() {
  return useQuery('totalResidents', dashboardRepository().getTotalResidents);
}

export function useGetTotalOrdersPending() {
  return useQuery(
    'totalOrdersPending',
    dashboardRepository().getTotalOrdersPending,
  );
}

export function useGetOrdersByMonth(): UseQueryResult<ChartData[], Error> {
  return useQuery('ordersByMonth', dashboardRepository().getOrderByMonth);
}

export function useGetOrdersByCondominium(): UseQueryResult<
  ChartData[],
  Error
> {
  return useQuery(
    'ordersByCondominium',
    dashboardRepository().getOrderByCondominium,
  );
}
