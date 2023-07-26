import DataTable from '../../components/DataTable';
import {
  useCreateOrder,
  useGetOrders,
  useReSendNotification,
} from './api/service';
import { columns } from './components/Columns/index';
import Modal from '../../components/Modal';
import { useCallback, useRef, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Truck } from 'lucide-react';
import { useGetResidents } from '../Residents/api';
import { CreateOrder } from './interfaces';
import LoadingComponent from '../../components/Loading';
import GlitchError from '../../components/Error';
import Webcam from 'react-webcam';
import { videoConstraints } from './constraints';
import { BarcodeOutlined } from '@ant-design/icons';
import RateComponent from '../../components/Rate';

function OrdersPage() {
  const { data, isLoading, error } = useGetOrders();
  const { data: residents } = useGetResidents();

  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const { mutate: createOrderMutation } = useCreateOrder();

  const { mutate: reSendNotificationMutation } = useReSendNotification();

  function handleSubmit(values: CreateOrder) {
    createOrderMutation({
      ...values,
      imgSrc,
    });
    setOpen(false);
    form.resetFields();
  }

  function handleCancel() {
    const stream = webcamRef?.current?.stream;
    stream?.getTracks().forEach((track) => track.stop());
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
        onCancel={handleCancel}
        title={'Cadastrar encomenda'}
      >
        <Form form={form} className="grid grid-cols-12">
          <Form.Item className="col-span-full" name="sender">
            <Input prefix={<Truck size={16} />} placeholder="Remetente" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="trackingCode"
            rules={[
              {
                min: 13,
                message: 'O código deve ter no mínimo 13 caracteres',
              },
            ]}
          >
            <Input
              prefix={<BarcodeOutlined size={16} />}
              placeholder="código de rastreamento"
            />
          </Form.Item>
          <Form.Item className="col-span-full" name="description">
            <Input.TextArea placeholder="Descrição" />
          </Form.Item>
          <Form.Item
            className="col-span-full"
            name="addresseeId"
            rules={[
              {
                required: true,
                message: 'Selecione o residente!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Selecione o residente"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={residents ?? []}
            />
          </Form.Item>
          <Form.Item name="img" className="col-span-full">
            {imgSrc ? (
              <img
                className="flex justify-center items-center rounded-md shadow-md"
                src={imgSrc}
                alt="Imagem capturada"
              />
            ) : (
              <Webcam
                className="flex justify-center items-center rounded-md shadow-md"
                audio={false}
                ref={webcamRef}
                width={450}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored
              />
            )}
            <Button className="mt-3" onClick={capture}>
              {imgSrc ? 'Recapturar' : 'Capturar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <RateComponent />
      {isLoading && <LoadingComponent />}
      {error && <GlitchError text="ERRO NA BUSCA DE DADOS" />}
      {data && <DataTable data={data ?? []} columns={orderColumns} />}
    </>
  );
}

export default OrdersPage;
