import { Link } from 'react-router-dom';
import LogoImg from '../../assets/DeliveryHub.svg';
import mobileLogoImg from '../../assets/DH.svg';
interface LogoProps {
  width?: string;
  mobile?: boolean;
}

function Logo({ width = 'max-w-full', mobile = false }: LogoProps) {
  return (
    <Link to={'/'}>
      <img
        className={`p-5 ${width} h-auto align-middle border-none items-center justify-center flex`}
        src={mobile ? mobileLogoImg : LogoImg}
        alt="logo"
        loading="lazy"
      />
    </Link>
  );
}

export default Logo;
