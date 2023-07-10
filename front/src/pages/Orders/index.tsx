import { useMutation, useQuery, useQueryClient } from "react-query";
import DataTable from "../../components/DataTable";
import { createOrder, getOrders, reSendNotification } from "./api";
import { columns } from "./components/Columns";
import Modal from "../../components/Modal";
import { useState } from "react";
import { Form, Input, Select } from "antd";
import { Truck } from "lucide-react";
import { getResidents } from "../Residents/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../../services/api/interfaces";
import { CreateOrder } from "./interfaces";
import  LoadingComponent  from "../../components/Loading";
import GlitchError from "../../components/Error";

function OrdersPage() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("orderData", getOrders);
  const { data: residents } = useQuery("residentsList", getResidents);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { mutate: createOrderMutation } = useMutation(createOrder, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries("orderData");
      toast.success("Encomenda cadastrada com sucesso");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? "Erro ao cadastrar a encomenda"
      );
    },
  });

  const { mutate: reSendNotificationMutation } = useMutation(
    reSendNotification,
    {
      onSuccess: () => {
        toast.success('Notificação enviada com sucesso');
      },
      onError: () => {
        toast.error('Erro ao enviar a notificação');
      },
    }
  );

  function handleSubmit(values: CreateOrder) {
    createOrderMutation(values);
  }

  const orderColumns = columns({ reSendNotificationMutation });

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        form={form}
        width={500}
        title="Cadastrar encomenda"
      >
        <Form form={form} className="grid grid-cols-12">
          <Form.Item className="col-span-full" name="sender">
            <Input prefix={<Truck size={16} />} placeholder="Remetente" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="addresseeId"
            rules={[
              {
                required: true,
                message: "Selecione o residente!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Selecione o residente"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={residents ?? []}
            />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading && <LoadingComponent/>}
      {error && <GlitchError text="ERRO NA BUSCA DE DADOS" />}
      {data && <DataTable data={data ?? []} columns={orderColumns} />}
    </>
  );
}

export default OrdersPage;
