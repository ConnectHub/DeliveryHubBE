import { Button, FormInstance, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ModalComponentProps {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: any) => void;
  form: FormInstance<any>;
  setIsEditing?: (isEditing: boolean) => void;
  width?: number;
}

function FormModalComponent({
  title,
  width = 1000,
  onSubmit,
  form,
  open,
  setIsEditing,
  setOpen,
  children,
}: ModalComponentProps) {
  function handleClick() {
    form.resetFields();
    setOpen(true);
  }

  return (
    <>
      <Button type="primary" className="mb-2" onClick={handleClick}>
        <PlusOutlined className="text-md font-bold" />
      </Button>
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => {
          form
            .validateFields()
            .then((values: any) => {
              onSubmit(values);
            })
            .catch((info: any) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => setOpen(false)}
        width={width}
        okText="salvar"
        cancelText="cancelar"
      >
        {children}
      </Modal>
    </>
  );
}

export default FormModalComponent;
