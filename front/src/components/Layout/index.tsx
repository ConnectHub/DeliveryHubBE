import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Users, Package, Building2 } from 'lucide-react';
import { Layout, Menu, Button, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import Logo from '../Logo';
const { Header, Sider, Content } = Layout;

function LayoutScreen() {
  const { state: collapsed, toggle: toggleCollapsed } = useToggle();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigator = useNavigate();
  const location = useLocation();

  return (
    <Layout className="m-0">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="mb-2">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/orders',
              icon: <Package size={18} />,
              label: 'Encomendas',
              onClick: () => navigator('/orders'),
            },
            {
              key: '/residents',
              icon: <Users size={18} />,
              label: 'Residentes',
              onClick: () => navigator('/residents'),
            },
            {
              key: '/condominiums',
              icon: <Building2 size={14} />,
              label: 'Condomínios',
              onClick: () => navigator('/condominiums'),
            },
          ]}
        />
      </Sider>
      <Layout className={colorBgContainer}>
        <Header className="flex p-0 bg-primary justify-between px-2">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="text-white" />
              ) : (
                <MenuFoldOutlined className="text-white" />
              )
            }
            onClick={toggleCollapsed}
            className="text-base w-[64px] h-[64px]"
          />
        </Header>
        <Content className={`my-6 mx-4 min-h-[280px] h-[100vh] rounded`}>
          <Outlet />
        </Content>
        <Footer className="text-center">
          Delivery Hub ©2023 Created with ❤️ by Delivery Hub
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutScreen;
