import { Tag } from "antd";

export const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Número de Telefone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: string) => {
      let color = "geekblue";
      if (text === "CANCELADO") color = "volcano";
      if (text === "ENTREGUE") color = "green";
      return (
        <Tag color={color} key={text}>
          {text.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Enviante",
    dataIndex: "sender",
    key: "sender",
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
