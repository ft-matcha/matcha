import { InputContainerProps } from '@/types';
import Label from './ui/Label';
import Input from './ui/input';

const InputContainer: React.FC<InputContainerProps> = ({ name, children, ...rest }) => {

  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Input name={name} {...rest}></Input>

      {children}
    </div>
  );
};

export default InputContainer;
