import DataTable from '../../components/DataTable';
import { columns } from './components/Columns';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import GlitchError from '../../components/Error';
import { Form, Select } from 'antd';
import { useState } from 'react';
import { Resident } from './interfaces';
import { Home, Mail, Phone, User } from 'lucide-react';
import LoadingComponent from '../../components/Loading';
import { useGetCondominiums } from '../Condominiums/api/service';
import {
  useCreateResident,
  useDeleteResident,
  useGetResidents,
  useUpdateResident,
} from './api/service';

function ResidentsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error, data } = useGetResidents();
  const { data: condominiums } = useGetCondominiums();

  const { mutate: createResidentMutation } = useCreateResident();

  const { mutate: updateResidentMutation } = useUpdateResident();

  const { mutate: deleteResidentMutation } = useDeleteResident();

  function handleEdit(resident: Resident) {
    return () => {
      form.setFieldsValue({ ...resident, id: resident.id });
      setOpen(true);
      setIsEditing(true);
    };
  }

  function handleSubmit(values: Resident) {
    if (isEditing) {
      updateResidentMutation(values);
      setOpen(false);
      return;
    }
    createResidentMutation(values);
    setOpen(false);
    form.resetFields();
  }

  const residentColumns = columns({ deleteResidentMutation, handleEdit });

  return (
    <>
      <Modal
        onCancel={() => setIsEditing(false)}
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

      {isLoading && <LoadingComponent />}
      {error && <GlitchError text="ERRO NA BUSCA DE DADOS" />}
      {data && <DataTable data={data ?? []} columns={residentColumns} />}
    </>
  );
}

export default ResidentsPage;
