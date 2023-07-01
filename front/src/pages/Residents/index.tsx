import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataTable from '../../components/DataTable';
import {
  createResident,
  getResidents,
  deleteResident,
  updateResident,
} from './api';
import NavBar from '../../components/SideBar';
import { columns } from './components/columns';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import {
  ApartmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Form } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../../interfaces';
import { Resident } from './interfaces';

const query = 'residentData';

function ResidentsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error, data } = useQuery(query, getResidents);
  const { mutate: createResidentMudation } = useMutation(createResident, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries(query);
      toast.success('Resident created successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error creating resident'
      );
    },
  });
  const { mutate: deleteResidentMutation } = useMutation(deleteResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success('Resident deleted successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error creating resident'
      );
    },
  });
  const { mutate: updateResidentMutation } = useMutation(updateResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success('Resident deleted successfully');
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error creating resident'
      );
    },
  });

  function handleEdit(resident: Resident) {
    return () => {
      form.setFieldsValue({ ...resident, id: resident.id });
      setOpen(true);
      setIsEditing(true);
    };
  }

  function handleSubmit(values: Resident) {
    if (isEditing) return updateResidentMutation(values);
    createResidentMudation(values);
  }

  const residentColumns = columns({ deleteResidentMutation, handleEdit });

  if (error) return <div>error</div>;

  return (
    <NavBar>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsEditing={setIsEditing}
        onSubmit={handleSubmit}
        form={form}
        width={500}
        title={isEditing ? 'editar residente' : 'criar residente'}
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
            <Input prefix={<UserOutlined />} placeholder="nome" />
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
            <Input prefix={<PhoneOutlined />} placeholder="telefone" />
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
              prefix={<ApartmentOutlined />}
              placeholder="bloco e apartamento"
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
            <Input prefix={<MailOutlined />} placeholder="email" />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <DataTable data={data ?? []} columns={residentColumns} />
      )}
    </NavBar>
  );
}

export default ResidentsPage;
