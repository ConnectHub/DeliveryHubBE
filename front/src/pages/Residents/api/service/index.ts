import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../../../services/api/interfaces';
import { AxiosError } from 'axios';
import { ResidentRepository } from '../repository';

const QUERY_KEY = 'residentData';

export function useGetResidents() {
  return useQuery(QUERY_KEY, ResidentRepository.getResidents);
}

export function useCreateResident() {
  const queryClient = useQueryClient();
  return useMutation(ResidentRepository.createResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Residente cadastrado com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao cadastrar o residente',
      );
    },
  });
}

export function useUpdateResident() {
  const queryClient = useQueryClient();
  return useMutation(ResidentRepository.updateResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Residente editado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao editar o residente.',
      );
    },
  });
}

export function useDeleteResident() {
  const queryClient = useQueryClient();
  return useMutation(ResidentRepository.deleteResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Residente deletado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao deletar o residente.',
      );
    },
  });
}