import { Button, Popconfirm } from 'antd';
import { Condominium } from '../interfaces';

interface ColumnsProps {
  deleteCondominiumMutation: (id: string) => void;
  handleEdit: (resident: Condominium) => void;
}

export function columns({
  deleteCondominiumMutation,
  handleEdit,
}: ColumnsProps) {
  return [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: Condominium) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>

          <Popconfirm
            title="tem certeza?"
            onConfirm={() => deleteCondominiumMutation(record.id)}
          >
            <Button type="link" className="text-red-500">
              Apagar
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
}
