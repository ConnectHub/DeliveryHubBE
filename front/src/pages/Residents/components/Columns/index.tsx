import { Button, Popconfirm } from 'antd';
import { Resident } from '../../interfaces';

interface ColumnsProps {
  deleteResidentMutation: (id: string) => void;
  handleEdit: (resident: Resident) => void;
}

export function columns({ deleteResidentMutation, handleEdit }: ColumnsProps) {
  return [
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
      title: 'Ações',
      key: 'action',
      render: (_: any, record: Resident) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>

          <Popconfirm
            title="tem certeza?"
            onConfirm={() => deleteResidentMutation(record.id)}
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
