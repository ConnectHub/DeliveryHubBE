import { CheckCircleOutlined } from '@ant-design/icons';
import Logo from '../../../../components/Logo';

function OrderConfirmedPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Logo logoWidth="w-[200px]" />
        <h2 className="mb-5 text-center text-white">Pedido confirmado!</h2>
        <CheckCircleOutlined className="text-green-500 text-[64px]" />
      </div>
    </div>
  );
}

export default OrderConfirmedPage;
