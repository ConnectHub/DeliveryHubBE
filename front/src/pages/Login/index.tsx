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
    if (token) navigator('/');
  }, [token, navigator]);

  useEffect(() => {
    if (isError) toast.error('Email ou senha incorretos');
  }, [isError]);

  async function handleLogin(values: FormValues) {
    signIn(values);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-5 shadow-2xl rounded-2xl shadow-black">
        <Logo logoWidth="w-[300px]" />

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
            <div className="flex items-center justify-center w-full py-2 mx-auto mb-4 bg-red-500 rounded">
              <label className="text-center text-white">
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
          <Form.Item className="flex items-center justify-center">
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
