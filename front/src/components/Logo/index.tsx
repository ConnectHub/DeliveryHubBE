import LogoImg from '../../assets/logo.png';

interface LogoProps {
  width?: string;
}

function Logo({ width = 'max-w-full' }: LogoProps) {
  return (
    <img
      className={`p-5 ${width} h-auto align-middle border-none`}
      src={LogoImg}
      alt="logo"
      loading="lazy"
    />
  );
}

export default Logo;
