import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataTable from '../../components/DataTable';
import { createResident, getResidents } from './api';
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

const query = 'residentData';

function ResidentsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { isLoading, error, data } = useQuery(query, getResidents);
  const { mutate } = useMutation(createResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      setOpen(false);
      form.resetFields();
      toast.success('Resident created successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? 'Error creating resident'
      );
    },
  });
  const queryClient = useQueryClient();

  const residents =
    data?.map((resident) => ({
      key: resident.id,
      ...resident,
    })) ?? [];

  if (error) return <div>error</div>;

  return (
    <NavBar>
      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={mutate}
        form={form}
        width={500}
        title="cadastrar novo residente"
      >
        <Form form={form} className="grid grid-cols-12">
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
      <DataTable data={residents} columns={columns} />
    </NavBar>
  );
}

export default ResidentsPage;
