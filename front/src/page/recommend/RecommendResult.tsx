import Card from '@/components/ui/Card';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { lazy } from 'react';
import debounce from '@/utils/debounce';
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

  const api = useContext(ApiContainers);
  const [data, setData] = useState({
    gender: '',
    name: {
      first: '',
      last: '',
    },
    picture: {
      thumbnail: '',
    },
  });
  const setChangeData = useCallback(
    debounce(async (data?: any) => {
      const response = (await api.call(
        'get',
        'register',
        null,
        'https://randomuser.me/api',
      )) as any;
      setData({ ...response.results[0] });
    }, 400),
    [],
  );

  useEffect(() => {
    setChangeData(id);
  }, [id]);

  return (
    <Card width="100%" height="100%" {...rest}>
      <Card.Header>
        <h2 style={{ fontSize: '32px' }}>{data?.name.first + data?.name.last}</h2>
      </Card.Header>
      <Card.Body>
        <img src={data.picture.thumbnail} alt="thumbnail" />
      </Card.Body>
    </Card>
  );
};

export default RecommendResult;
