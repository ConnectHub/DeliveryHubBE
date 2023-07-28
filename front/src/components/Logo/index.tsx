import { Link } from 'react-router-dom';
import LogoImg from '../../assets/DeliveryHub.svg';
import MobileLogoImg from '../../assets/DH.svg';
interface LogoProps {
  logoWidth?: string;
  mobile?: boolean;
}

function Logo({ logoWidth = 'max-w-full', mobile = false }: LogoProps) {
  return (
    <Link to={'/'}>
      <img
        className={`flex justify-center items-center p-5 ${logoWidth} h-auto align-middle border-none`}
        src={mobile ? MobileLogoImg : LogoImg}
        alt="logo"
        loading="lazy"
      />
    </Link>
  );
}

export default Logo;
