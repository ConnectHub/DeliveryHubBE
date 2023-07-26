import { Button } from 'antd';
import { LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation('common');

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Button
      icon
      onClick={handleLogout}
      className="text-white flex items-center font-inter"
      type="link"
    >
      <LogOutIcon className="mr-2" />
      {t('logout.button')}
    </Button>
  );
}

export default LogoutButton;
