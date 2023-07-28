import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../../../services/api/interfaces';
import { AxiosError } from 'axios';
import { OrderRepository } from '../repository';

const QUERY_KEY = 'orderData';

export function useGetOrders() {
  return useQuery(QUERY_KEY, OrderRepository.getOrders);
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation(OrderRepository.createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Encomenda cadastrada com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao cadastrar a encomenda',
      );
    },
  });
}

export function useReSendNotification() {
  return useMutation(OrderRepository.reSendNotification, {
    onSuccess: () => {
      toast.success('Notificação enviada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao enviar a notificação');
    },
  });
}
