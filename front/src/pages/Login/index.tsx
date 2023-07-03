import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import { FormValues } from './interfaces';
import { useContext, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

function LoginPage() {
  const navigator = useNavigate();
  const { signIn, user } = useContext(AuthContext);
  const [token] = useLocalStorage('token', user.authToken);

  useEffect(() => {
    if (token) navigator('/orders');
  }, [token, navigator]);

  async function handleLogin(values: FormValues) {
    signIn(values);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 rounded-2xl shadow-2xl shadow-black">
        <Logo width="w-[300px]" />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label={
              <label
                style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter' }}
              >
                Email:
              </label>
            }
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
