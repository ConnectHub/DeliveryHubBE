import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataTable from '../../components/DataTable';
import {
  createResident,
  getResidents,
  deleteResident,
  updateResident,
} from './api';
import { columns } from './components/Columns';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import { Form, Select } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../../services/api/interfaces';
import { Resident } from './interfaces';
import { Home, Mail, Phone, User } from 'lucide-react';
import { LoadingComponent } from '../../components/Loading';
import { getCondominiums } from '../Condominiums/api';

const query = 'residentData';

function ResidentsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error, data } = useQuery(query, getResidents);
  const { data: condominiums } = useQuery('condominiumsList', getCondominiums);

  const { mutate: createResidentMutation } = useMutation(createResident, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries(query);
      toast.success('Residente cadastrado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao cadastrar o residente.',
      );
    },
  });

  const { mutate: updateResidentMutation } = useMutation(updateResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success('Resident editado com sucesso!');
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao editar o residente.',
      );
    },
  });

  const { mutate: deleteResidentMutation } = useMutation(deleteResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success('Resident deletado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error ao deletar o residente.',
      );
    },
  });

  function handleEdit(resident: Resident) {
    return () => {
      form.setFieldsValue({ ...resident, id: resident.id });
      setOpen(true);
      setIsEditing(true);
      console.log(resident);
    };
  }

  function handleSubmit(values: Resident) {
    if (isEditing) return updateResidentMutation(values);
    createResidentMutation(values);
  }

  const residentColumns = columns({ deleteResidentMutation, handleEdit });

  if (error) return <div>error</div>;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsEditing={setIsEditing}
        onSubmit={handleSubmit}
        form={form}
        width={500}
        title={isEditing ? 'Editar Residente' : 'Cadastrar residente'}
      >
        <Form form={form} className="grid grid-cols-12">
          <Form.Item name="id" className="hidden"></Form.Item>
          <Form.Item
            className="col-span-full"
            name="name"
            rules={[
              {
                required: true,
                message: 'Coloque o nome do residente',
              },
            ]}
          >
            <Input prefix={<User size={16} />} placeholder="Nome" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Coloque o telefone do residente',
              },
            ]}
          >
            <Input prefix={<Phone size={16} />} placeholder="Telefone" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="buildingApartment"
            rules={[
              {
                required: true,
                message: 'Coloque o bloco e apartamento do residente',
              },
            ]}
          >
            <Input
              prefix={<Home size={16} />}
              placeholder="Bloco e apartamento"
            />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Coloque um email válido',
              },
            ]}
          >
            <Input prefix={<Mail size={16} />} placeholder="Email" />
          </Form.Item>
          <Form.Item className="col-span-full" name="condominiumId">
            <Select
              showSearch
              placeholder="Selecione o condomínio"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={condominiums ?? []}
            />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <DataTable data={data ?? []} columns={residentColumns} />
      )}
    </>
  );
}

export default ResidentsPage;
