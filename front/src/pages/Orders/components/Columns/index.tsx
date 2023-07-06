import { Tag } from 'antd';
import { Order } from '../../interfaces';
import { CloudDownloadOutlined } from '@ant-design/icons';

export const columns = [
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      let color = 'geekblue';
      if (text === 'CANCELADO') color = 'volcano';
      if (text === 'ENTREGUE') color = 'green';
      return (
        <Tag color={color} key={text}>
          {text.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Remetente',
    dataIndex: 'sender',
    key: 'sender',
  },
  {
    title: 'Criado em',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Ações',
    key: 'action',
    align: 'center',
    render: (record: Order) => (
      <>
        <div className="flex justify-center text-center items-center">
          <a target="_blank" href={record.sign}>
            <CloudDownloadOutlined className="text-2xl" />
            <div className="flex justify-center text-center">
              baixar assinatura
            </div>
          </a>
        </div>
      </>
    ),
  },
];
