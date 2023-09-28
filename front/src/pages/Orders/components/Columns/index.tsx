import { Tag } from 'antd';
import { Order } from '../../interfaces';
import {
  CloudDownloadOutlined,
  FileImageOutlined,
  SendOutlined,
} from '@ant-design/icons';

interface ColumnsProps {
  reSendNotificationMutation: (id: string) => void;
}

export function columns({ reSendNotificationMutation }: ColumnsProps) {
  return [
    {
      title: 'Destinatário',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Bloco / Apartamento',
      dataIndex: 'buildingApartment',
      key: 'buildingApartment',
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
      title: 'Data de recebimento',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Data da assinatura',
      dataIndex: 'signDateHour',
      key: 'signDateHour',
    },
    {
      title: 'Ações',
      key: 'action',
      align: 'center',
      render: (record: Order) => (
        <div className="flex items-center justify-center text-center">
          {record.sign && (
            <a target="_blank" href={record.sign} className="mr-3">
              <CloudDownloadOutlined className="text-2xl" />
              <div className="flex justify-center text-center">assinatura</div>
            </a>
          )}
          {record.img && (
            <a target="_blank" href={record.img}>
              <FileImageOutlined className="text-2xl" />
              <div className="flex justify-center text-center">imagem</div>
            </a>
          )}
          <a
            onClick={() => reSendNotificationMutation(record.id)}
            className="m-3"
          >
            <SendOutlined className="text-2xl" />
            <div className="flex justify-center text-center">notificação</div>
          </a>
        </div>
      ),
    },
  ];
}
