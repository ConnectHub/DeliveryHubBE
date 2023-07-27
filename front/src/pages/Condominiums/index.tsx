import { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Form, Input } from 'antd';
import Modal from '../../components/Modal';
import DataTable from '../../components/DataTable';
import LoadingComponent from '../../components/Loading';
import {
  createCondominium,
  deleteCondominium,
  getCondominiums,
  updateCondominium,
} from './api';
import { columns } from './components/columns';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../services/api/interfaces';
import { toast } from 'react-toastify';
import { Building2 } from 'lucide-react';
import { Condominium } from './interfaces';
import GlitchError from '../../components/Error';

function CondominiumsPage() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(
    'condominiumData',
    getCondominiums,
  );
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: createCondominiumMutation } = useMutation(createCondominium, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries('condominiumData');
      toast.success('Condomínio cadastrado com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao cadastrar o condomínio',
      );
    },
  });

  const { mutate: updateCondominiumMutation } = useMutation(updateCondominium, {
    onSuccess: () => {
      queryClient.invalidateQueries('condominiumData');
      toast.success('Condomínio editado com sucesso');
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Erro ao editar o condomínio',
      );
    },
  });

  const { mutate: deleteCondominiumMutation } = useMutation(deleteCondominium, {
    onSuccess: () => {
      queryClient.invalidateQueries('condominiumData');
      toast.success('Condomínio deletado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao deletar o Condomínio.',
      );
    },
  });

  function handleEdit(condominium: Condominium) {
    return () => {
      form.setFieldsValue({ ...condominium, id: condominium.id });
      setOpen(true);
      setIsEditing(true);
    };
  }

  function handleSubmit(values: Condominium) {
    if (isEditing) return updateCondominiumMutation(values);
    createCondominiumMutation(values);
  }

  const condominiumColumns = columns({ deleteCondominiumMutation, handleEdit });

  return (
    <>
      <Modal
        onCancel={() => setIsEditing(false)}
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        form={form}
        width={500}
        title={isEditing ? 'Editar condomínio' : 'Cadastrar condomínio'}
      >
        <Form form={form} className="grid grid-cols-12">
          <Form.Item name="id" className="hidden"></Form.Item>
          <Form.Item
            className="col-span-full"
            name="name"
            rules={[
              {
                required: true,
                message: 'Informe o nome do condomínio!',
              },
            ]}
          >
            <Input
              prefix={<Building2 size={16} />}
              placeholder="Nome do condomínio"
            />
          </Form.Item>
        </Form>
      </Modal>

      {isLoading && <LoadingComponent />}
      {error && <GlitchError text="ERRO NA BUSCA DE DADOS" />}
      {data && <DataTable data={data ?? []} columns={condominiumColumns} />}
    </>
  );
}

export default CondominiumsPage;
