import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../../../services/api/interfaces';
import { AxiosError } from 'axios';
import { orderRepository } from '../repository';
import { TFunction } from 'i18next';


const QUERY_KEY = 'orderData';

export function useGetOrders() {
  return useQuery(QUERY_KEY, OrderRepository.getOrders);
}

export function useCreateOrder(t: TFunction) {
  const queryClient = useQueryClient();
  return useMutation(OrderRepository.createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success(t('orders.create.success'));
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message[0] ?? t('orders.create.error'));
    },
  });
}


export function useReSendNotification(t: TFunction) {
  return useMutation(orderRepository().reSendNotification, {
    onSuccess: () => {
      toast.success(t('orders.notification.success'));
    },
    onError: () => {
      toast.error(t('orders.notification.error'));
    },
  });
}
