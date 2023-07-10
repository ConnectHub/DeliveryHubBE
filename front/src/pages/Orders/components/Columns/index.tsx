import { Tag } from 'antd';
import { Order } from '../../interfaces';
import { CloudDownloadOutlined, SendOutlined } from '@ant-design/icons';

interface ColumnsProps {
  reSendNotificationMutation: (id: string) => void;
}

export function columns({ reSendNotificationMutation }: ColumnsProps) {
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
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
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
            <a
              onClick={() => reSendNotificationMutation(record.id)}
              className="m-3"
            >
              <SendOutlined className="text-2xl" />
              <div className="flex justify-center text-center">
                reenviar notificação
              </div>
            </a>
          </div>
        </>
      ),
    },
  ];
}
