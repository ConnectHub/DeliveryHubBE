import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function LogoutButton() {
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <Button icon onClick={handleLogout} className="text-white" type="link">
        <LogoutOutlined />
        Sair
      </Button>
    </div>
  );
}

export default LogoutButton;
