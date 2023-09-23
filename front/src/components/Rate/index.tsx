import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createRate } from './api';
import useLocalStorage from 'use-local-storage';

function RateComponent() {
  const [temporaryRate, setTemporaryRate] = useLocalStorage<boolean>(
    'temporaryRate',
    false,
  );
  const [rate, setRate] = useLocalStorage<boolean>('rate', false);

  const { mutate } = useMutation(createRate, {
    onSuccess: () => {
      setRate(true);
      toast.success('Obrigado pela avaliação!');
    },
    onError: () => {
      toast.error('Erro ao cadastrar a avaliação, tente novamente mais tarde', {
        position: 'top-right',
      });
    },
  });

  return (
    <>
      {!temporaryRate && !rate && (
        <div className="fixed bottom-5 right-5 bg-slate-50 animate-bounce duration-75 hover:animate-none">
          <div className="p-8 shadow-lg border-2 rounded">
            <CloseOutlined
              className="absolute top-3 right-3 cursor-pointer text-slate-400 hover:text-black"
              onClick={() => setTemporaryRate(true)}
            />
            <Rate
              className="text-red-500"
              onChange={mutate}
              character={<HeartOutlined />}
            />
            <div className="flex font-inter justify-center items-center text-center mt-2">
              <span className="text-sm">Avalie nosso app!</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RateComponent;
