import Card from '@/components/ui/Card';
import { useParams } from 'react-router-dom';


export const RecommendTest = ({ ...rest }) => {
  return (
    <>
      <Card width="100%">
        <Card.Body>hello this is Test</Card.Body>
      </Card>
    </>
  );
};

const RecommendResult = ({ ...rest }) => {
  const { id } = useParams();

  return (
    <Card width="100%" height="100%" {...rest}>
      <Card.Header>
        <h2 style={{ fontSize: '32px' }}>{id}</h2>
      </Card.Header>
      <Card.Body>
        <img src="https://via.placeholder.com/150" alt="placeholder" />
      </Card.Body>
    </Card>
  );
};

export default RecommendResult;
