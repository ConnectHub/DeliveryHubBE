import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

interface NavBarProps {
  children: React.ReactNode;
}

function SideBar({ children }: NavBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigator = useNavigate();

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
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
              onClick: () => navigator('/residents'),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-primary">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="text-white" />
              ) : (
                <MenuFoldOutlined className="text-white" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            className="text-base w-[64px] h-[64px]"
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: '100vh',
          }}
        >
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
