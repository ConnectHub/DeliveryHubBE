import { useEffect, useRef, useState } from 'react';
import AuthCode from 'react-auth-code-input';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmOrder, getOrderByUrl } from './api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../services/api/interfaces';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'antd';
import { errorTranslator } from './translator';
import Logo from '../../components/Logo';

function SignOrderPage() {
  const { url } = useParams();
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const signCanvaRef = useRef<SignatureCanvas>(null);
  const [code, setCode] = useState('');
  const [signature, setSignature] = useState<string | undefined>(undefined);

  const {
    data,
    isError,
    error: orderError,
  } = useQuery(['order', { url }], () => getOrderByUrl(url), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading, error } = useMutation(
    ['sign-order', { code, url, signature }],
    () => confirmOrder({ code, url, signature }),
    {
      onSuccess: () => {
        toast.success('Order signed successfully');
        queryClient.invalidateQueries(['order', { url }]);
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        toast.error(
          errorTranslator[error.response?.data.message ?? ''] ??
            'Error signing order'
        );
      },
    }
  );

  useEffect(() => {
    if (code.length === 6 && signature) mutate();
  }, [code, signature, mutate]);

  useEffect(() => {
    if (data?.originalStatus === 'DELIVERED')
      navigator('/sign-order/order-confirmed');
  }, [data, navigator]);

  const translatedError =
    errorTranslator[
      error?.response?.data.message ??
        (orderError as AxiosError<ErrorResponse>)?.response?.data.message ??
        ''
    ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Logo />
        <h2 className="text-white font-inter text-center">
          Digite o código recebido no seu whatsapp <br /> e assine o pedido
        </h2>
        <span className="text-red-400 font-bold mb-2 text-center max-w-sm">
          {translatedError}
        </span>
        <div className="relative">
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 200 }}
            backgroundColor="white"
            ref={signCanvaRef}
            minDistance={10}
            onEnd={() =>
              setSignature(
                signCanvaRef.current?.getTrimmedCanvas().toDataURL('image/png')
              )
            }
          />
          <div className="absolute bottom-0 right-0 mb-3 mr-3">
            <Button type="dashed" onClick={() => signCanvaRef.current?.clear()}>
              limpar
            </Button>
          </div>
        </div>
        <AuthCode
          inputClassName="uppercase color-[#494949] font-inter text-2xl p-0 mr-3 border rounded text-center w-[45px] h-[45px] bg-clip-padding shadow focus:appearance-none focus:outline-none focus:shadow-custom font-"
          containerClassName="p-4"
          allowedCharacters="alphanumeric"
          onChange={setCode}
          disabled={isLoading || signature === undefined || isError}
          autoFocus
          placeholder="_"
        />
      </div>
    </div>
  );
}

export default SignOrderPage;
