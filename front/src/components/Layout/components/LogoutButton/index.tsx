import { Button } from 'antd';
import { LogOutIcon } from 'lucide-react';

function LogoutButton() {
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <Button
        icon
        onClick={handleLogout}
        className="text-white flex gap-3"
        type="link"
      >
        <LogOutIcon />
        Sair
      </Button>
    </div>
  );
}

export default LogoutButton;
