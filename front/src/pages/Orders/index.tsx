import { useQuery } from "react-query";
import DataTable from "../../components/DataTable";
import { getOrders } from "./api";
import { columns } from "./components/columns";
import Modal from "../../components/Modal";
import { useState } from "react";
import { Form } from "antd";

function OrdersPage() {
  const { isLoading, error, data } = useQuery("orderData", getOrders);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  if (error) return <div>error</div>;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        // onSubmit={handleSubmit}
        form={form}
        width={500}
        title={"Criar order"}
        children={undefined}
        onSubmit={function (values: any): void {
          throw new Error("Function not implemented.");
        }}
      ></Modal>
      <DataTable data={data ?? []} columns={columns} />
    </>
  );
}

export default OrdersPage;
