import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import { FormValues } from './interfaces';
import { useContext, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigator = useNavigate();
  const { signIn, user, isError } = useContext(AuthContext);
  const [token] = useLocalStorage('token', user.authToken);

  useEffect(() => {
    if (token) navigator('/orders');
  }, [token, navigator]);

  useEffect(() => {
    if (isError) toast.error('Email ou senha incorretos');
  }, [isError]);

  async function handleLogin(values: FormValues) {
    signIn(values);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 rounded-2xl shadow-2xl shadow-black">
        <Logo width="w-[300px]" />

        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          {isError && (
            <div className="flex justify-center items-center w-full py-2 bg-red-500 mb-4 rounded mx-auto">
              <label className="text-white text-center">
                Email ou senha incorretos
              </label>
            </div>
          )}
          <Form.Item
            name="login"
            label={
              <label
                style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter' }}
              >
                Email:
              </label>
            }
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
            ]}
            style={{ color: 'red' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <label
                style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter' }}
              >
                Senha:
              </label>
            }
            rules={[
              {
                required: true,
                message: 'Por favor, insira sua senha!',
                min: 8,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox className="text-white">lembre me?</Checkbox>
          </Form.Item>
          <Form.Item className="flex justify-center items-center">
            <Button type="default" htmlType="submit">
              entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
