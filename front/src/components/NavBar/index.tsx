import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function NavBar() {
  return (
    <nav>
      <Button type="primary" icon={<MenuOutlined />}>
        <Drawer
          title="Topics"
          placement="left"
          onClick={() => console.log('clicked')}
          onClose={() => console.log('closed')}
          visible={true}
        />
      </Button>
    </nav>
  );
}

export default NavBar;
