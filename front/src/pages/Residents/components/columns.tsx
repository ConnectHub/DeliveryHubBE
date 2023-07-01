import { Button, Popconfirm } from 'antd';
import { Resident } from '../interfaces';

interface ColumnsProps {
  deleteResidentMutation: (id: string) => void;
  handleEdit: (resident: Resident) => () => void;
}

export function columns({ deleteResidentMutation, handleEdit }: ColumnsProps) {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Número de Telefone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Número do Apartamento',
      dataIndex: 'buildingApartment',
      key: 'buildingApartment',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Resident) => (
        <>
          <Button type="link" onClick={handleEdit(record)}>
            edit
          </Button>
          <Popconfirm
            title="sure to delete?"
            onConfirm={() => deleteResidentMutation(record.id)}
          >
            <Button type="link" className="text-red-500">
              delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
}
