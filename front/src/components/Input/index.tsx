import { Input } from 'antd';

interface InputComponentProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: JSX.Element;
}

function InputComponent({ ...props }: InputComponentProps) {
  return <Input {...props} />;
}

export default InputComponent;
