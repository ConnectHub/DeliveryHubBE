import {
  DropboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FiSun } from '@react-icons/all-files/fi/FiSun';
import { FiMoon } from '@react-icons/all-files/fi/FiMoon';
import { Layout, Menu, Button, theme, Space, Switch } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
const { Header, Sider, Content } = Layout;

interface NavBarProps {
  children: React.ReactNode;
}

function SideBar({ children }: NavBarProps) {
  const { state: collapsed, toggle: toggleCollapsed } = useToggle();
  const { state: darkMode, toggle: toggleDarkMode } = useToggle();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigator = useNavigate();
  const location = useLocation();

  return (
    <Layout className="m-0">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="mb-2">
          <img
            className="rounded p-5 max-w-full h-auto align-middle border-none"
            src="https://m.media-amazon.com/images/G/01/DSP2022/hub/assets/AmazonHub_Logo_White-800x193.png"
            alt="img"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/orders',
              icon: <DropboxOutlined />,
              label: 'Orders',
              onClick: () => navigator('/orders'),
            },
            {
              key: '/residents',
              icon: <UserOutlined />,
              label: 'Residents',
              onClick: () => navigator('/residents'),
            },
          ]}
        />
      </Sider>
      <Layout className={`bg-${darkMode ? 'dark-primary' : colorBgContainer}`}>
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
          <Space direction="vertical">
            <Switch
              checkedChildren={<FiSun />}
              unCheckedChildren={<FiMoon />}
              defaultChecked
              onClick={toggleDarkMode}
            />
          </Space>
        </Header>
        <Content className={`my-6 mx-4 min-h-[280px] h-[100vh] rounded`}>
          {children}
        </Content>
        <Footer className="text-center">
          Delivery Hub ©2023 Created with ❤️ by Delivery Hub
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SideBar;
