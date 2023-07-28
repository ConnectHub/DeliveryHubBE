import { useMutation, useQuery, useQueryClient } from 'react-query';
import { condominiumRepository } from '../repository';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../../../services/api/interfaces';

const QUERY_KEY = 'condominiumsData';

export function useGetCondominiums() {
  return useQuery(QUERY_KEY, condominiumRepository().getCondominiums);
}

export function useCreateCondominium() {
  const queryClient = useQueryClient();
  return useMutation(condominiumRepository().createCondominium, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Condomínio cadastrado com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao cadastrar o condomínio',
      );
    },
  });
}

export function useDeleteCondominium() {
  const queryClient = useQueryClient();
  return useMutation(condominiumRepository().deleteCondominium, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Condomínio deletado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao deletar o Condomínio.',
      );
    },
  });
}

export function useUpdateCondominium() {
  const queryClient = useQueryClient();
  return useMutation(condominiumRepository().updateCondominium, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Condomínio editado com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao editar o condomínio',
      );
    },
  });
}
