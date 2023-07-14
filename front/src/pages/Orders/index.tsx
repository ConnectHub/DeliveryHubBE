import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataTable from '../../components/DataTable';
import { createOrder, getOrders, reSendNotification } from './api';
import { columns } from './components/Columns/index';
import Modal from '../../components/Modal';
import { useCallback, useRef, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Truck } from 'lucide-react';
import { getResidents } from '../Residents/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../services/api/interfaces';
import { CreateOrder } from './interfaces';
import { LoadingComponent } from '../../components/Loading';
import Webcam from 'react-webcam';
import { videoConstraints } from './constraints';
import { BarcodeOutlined } from '@ant-design/icons';

function OrdersPage() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery('orderData', getOrders);
  const { data: residents } = useQuery('residentsList', getResidents);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (imgSrc) return setImgSrc(null);
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setImgSrc(imageSrc);
  }, [webcamRef, imgSrc]);

  const { mutate: createOrderMutation } = useMutation(createOrder, {
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries('orderData');
      toast.success('Encomenda cadastrada com sucesso');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message ?? 'Erro ao cadastrar a encomenda',
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
    },
  );

  function handleSubmit(values: CreateOrder) {
    createOrderMutation({
      ...values,
      imgSrc,
    });
    setImgSrc(null);
  }

  const orderColumns = columns({ reSendNotificationMutation });

  if (error) return <div>error</div>;

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        form={form}
        width={500}
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
              <>
                <Webcam
                  className="flex justify-center items-center rounded-md shadow-md"
                  audio={false}
                  ref={webcamRef}
                  width={450}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  mirrored
                />
              </>
            )}
            <Button className="mt-3" onClick={capture}>
              {imgSrc ? 'Recapturar' : 'Capturar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <DataTable data={data ?? []} columns={orderColumns} />
      )}
    </>
  );
}

export default OrdersPage;
