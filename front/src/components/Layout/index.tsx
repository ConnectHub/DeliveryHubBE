import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Users, Package, Building2 } from 'lucide-react';
import { Layout, Menu, Button, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import Logo from '../Logo';
import LogoutButton from './components/LogoutButton';
import useLocalStorage from 'use-local-storage';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/UserContext.tsx';
import { useContext } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery.ts';
const { Header, Sider, Content } = Layout;

function LayoutScreen() {
  const { state: collapsed, toggle: toggleCollapsed } = useToggle();
  const [username] = useLocalStorage('username', '');
  const { t } = useTranslation('common');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isMobile = useIsMobile();
  const { role } = useContext(AuthContext).user;

  const navigator = useNavigate();
  const location = useLocation();
  const menuItems = [
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
      icon: <Building2 size={18} />,
      label: 'Condomínios',
      onClick: () => navigator('/condominiums'),
    },
  ];

  if (!role.includes('ADMIN')) menuItems.pop();

  return (
    <Layout className="m-0">
      <Sider trigger={null} collapsible collapsed={collapsed || isMobile}>
        <div className="mb-2">
          <Logo mobile={collapsed || isMobile} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout className={colorBgContainer}>
        <Header className="flex items-center justify-between p-0 px-2 bg-primary">
          <Button
            type="text"
            icon={
              collapsed || isMobile ? (
                <MenuUnfoldOutlined className="text-white" />
              ) : (
                <MenuFoldOutlined className="text-white" />
              )
            }
            onClick={toggleCollapsed}
            className="text-base w-[64px] h-[64px]"
          />
          <div className="flex items-center justify-center text-center">
            <div className="mr-2">
              <span className="hidden text-base text-white sm:block font-inter">
                {t('welcome.title')}, {username}.
              </span>
            </div>
            <LogoutButton />
          </div>
        </Header>
        <Content className="my-6 mx-4 min-h-[100vh] rounded">
          <Outlet />
        </Content>
        <Footer className="text-center">{t('footer.title')}</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutScreen;
