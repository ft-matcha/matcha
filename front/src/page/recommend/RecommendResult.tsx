import Card from '@/components/ui/Card';
import { useParams } from 'react-router-dom';

const RecommendResult = ({ ...rest }) => {
  const { id } = useParams();

  return (
    <Card width="100%" height="100%" {...rest}>
      <Card.Header>{id}</Card.Header>
      <Card.Body>
        <img src="https://via.placeholder.com/150" alt="placeholder" />
      </Card.Body>
    </Card>
  );
};

export default RecommendResult;
