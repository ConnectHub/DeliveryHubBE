import { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ModalComponentProps {
  children: React.ReactNode;
}

function ModalComponent({ children }: ModalComponentProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" className="mb-2" onClick={() => setOpen(true)}>
        <PlusOutlined className="text-md font-bold" />
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {children}
      </Modal>
    </>
  );
}

export default ModalComponent;
