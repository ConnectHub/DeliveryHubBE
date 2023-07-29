import { useState } from 'react';
import { Form, Input } from 'antd';
import Modal from '../../components/Modal';
import DataTable from '../../components/DataTable';
import LoadingComponent from '../../components/Loading';
import {
  useCreateCondominium,
  useDeleteCondominium,
  useGetCondominiums,
  useUpdateCondominium,
} from './api/service';
import { columns } from './components/columns';
import { Building2 } from 'lucide-react';
import { Condominium } from './interfaces';
import GlitchError from '../../components/Error';

function CondominiumsPage() {
  const { data, isLoading, error } = useGetCondominiums();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(condominium: Condominium) {
    form.setFieldsValue({ ...condominium, id: condominium.id });
    setOpen(true);
    setIsEditing(true);
  }

  const { mutate: createCondominiumMutation } = useCreateCondominium();
  const { mutate: deleteCondominiumMutation } = useDeleteCondominium();
  const { mutate: updateCondominiumMutation } = useUpdateCondominium();

  function handleSubmit(values: Condominium) {
    if (isEditing) {
      updateCondominiumMutation(values);
      setOpen(false);
      setIsEditing(false);
      return;
    }

    createCondominiumMutation(values);
    setOpen(false);
    form.resetFields();
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
