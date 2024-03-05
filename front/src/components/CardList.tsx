import Card, { CardBody, CardFooter, CardHeader } from '@/components/ui/Card';

interface CardApiProps {
  header?: string;
  body?: string | React.ReactNode;
  footer?: string;
}

interface CardListProps {
  data?: CardApiProps[];
  width?: string;
  minWidth?: string;
  children?: React.ReactNode;
}

const CardList: React.FC<CardListProps> = ({ data, children, ...rest }) => {
  return (
    <>
      {data?.map((item, ind) => (
        <Card key={`Card_${ind}`} {...rest}>
          {item.header && <CardHeader>{item.header}</CardHeader>}
          {item.body && <CardBody>{item.body}</CardBody>}
          {item.footer && <CardFooter>{item.footer}</CardFooter>}
        </Card>
      ))}
      {children}
    </>
  );
};

export default CardList;
