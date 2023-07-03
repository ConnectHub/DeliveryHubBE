import { useMutation, useQuery, useQueryClient } from "react-query";
import DataTable from "../../components/DataTable";
import {
  createResident,
  getResidents,
  deleteResident,
  updateResident,
} from "./api";
import { columns } from "./components/columns";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import {
  ApartmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Select } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { ErrorResponse } from "../../services/api/interfaces";
import { Resident } from "./interfaces";

const query = "residentData";

function ResidentsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error, data } = useQuery(query, getResidents);

  const { mutate: createResidentMutation } = useMutation(createResident, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries(query);
      toast.success("Resident created successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? "Error creating resident"
      );
    },
  });

  const { mutate: updateResidentMutation } = useMutation(updateResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success("Resident edited successfully");
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message[0] ?? "Error editing resident");
    },
  });

  const { mutate: deleteResidentMutation } = useMutation(deleteResident, {
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      toast.success("Resident deleted successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message[0] ?? "Error deleting resident"
      );
    },
  });

  function handleEdit(resident: Resident) {
    return () => {
      form.setFieldsValue({ ...resident, id: resident.id });
      setOpen(true);
      setIsEditing(true);
    };
  }

  function handleSubmit(values: Resident) {
    if (isEditing) return updateResidentMutation(values);
    createResidentMutation(values);
  }

  const residentColumns = columns({ deleteResidentMutation, handleEdit });

  if (error) return <div>error</div>;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        setIsEditing={setIsEditing}
        onSubmit={handleSubmit}
        form={form}
        width={500}
        title={isEditing ? "Editar Residente" : "Cadastrar residente"}
      >
        <Form form={form} className="grid grid-cols-12">
          <Form.Item name="id" className="hidden"></Form.Item>
          <Form.Item
            className="col-span-full"
            name="name"
            rules={[
              {
                required: true,
                message: "Coloque o nome do residente",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Coloque o telefone do residente",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Telefone" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="buildingApartment"
            rules={[
              {
                required: true,
                message: "Coloque o bloco e apartamento do residente",
              },
            ]}
          >
            <Input
              prefix={<ApartmentOutlined />}
              placeholder="Bloco e apartamento"
            />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="email"
            rules={[
              {
                type: "email",
                message: "Coloque um email válido",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item className="col-span-full" name="condominiumId">
            <Select
              showSearch
              placeholder="Selecione o condomínio"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "condominium1",
                  label: "Listagem de condomínios",
                },
                {
                  value: "condominium",
                  label: "Aguardando API de condomínios",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <DataTable data={data ?? []} columns={residentColumns} />
      )}
    </>
  );
}

export default ResidentsPage;
