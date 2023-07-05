import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

interface LogoProps {
  width?: string;
}

function Logo({ width = "max-w-full" }: LogoProps) {
  return (
    <Link to={"/"}>
      <img
        className={`p-5 ${width} h-auto align-middle border-none`}
        src={LogoImg}
        alt="logo"
        loading="lazy"
      />
    </Link>
  );
}

export default Logo;
