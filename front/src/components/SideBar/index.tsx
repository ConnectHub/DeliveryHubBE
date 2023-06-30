import { Layout } from 'antd';

function SideBar() {
  return (
    <Layout.Sider
      breakpoint="lg"
      theme="dark"
      collapsedWidth={0}
      trigger={null}
      className="mr-6 h-[100vh]"
    >
      SideBar
    </Layout.Sider>
  );
}

export default SideBar;
