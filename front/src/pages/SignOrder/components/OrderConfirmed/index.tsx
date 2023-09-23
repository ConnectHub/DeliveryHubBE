import { CheckCircleOutlined } from '@ant-design/icons';
import Logo from '../../../../components/Logo';

function OrderConfirmedPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Logo width="w-[200px]" />
        <h2 className="text-white text-center mb-5">Pedido confirmado!</h2>
        <CheckCircleOutlined className="text-green-500 text-[64px]" />
      </div>
    </div>
  );
}

export default OrderConfirmedPage;
