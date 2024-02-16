import Card, { CardBody, CardFooter, CardHeader } from '@/components/ui/Card';

interface CardApiProps {
  header?: string;
  body?: string;
  footer?: string;
}

interface CardListProps {
  data: CardApiProps[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <>
      {data.map((item, ind) => (
        <Card key={`Card_${ind}`}>
          {item.header && <CardHeader>{item.header}</CardHeader>}
          {item.body && <CardBody>{item.body}</CardBody>}
          {item.footer && <CardFooter>{item.footer}</CardFooter>}
        </Card>
      ))}
    </>
  );
};

export default CardList;
