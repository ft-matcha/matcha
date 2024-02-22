import Label from './ui/Label';

const LabelContainer = ({
  name,
  children,
  children1,
}: {
  name: string;
  children?: React.ReactNode;
  children1?: React.ReactNode;
}) => {
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      {children1}
      {children}
    </div>
  );
};

export default LabelContainer;
