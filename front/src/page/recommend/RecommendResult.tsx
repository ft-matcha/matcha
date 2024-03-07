import Card from '@/components/ui/Card';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import debounce from '@/utils/debounce';

export const RecommendTest = ({ ...rest }) => {
  const api = useContext(ApiContainers);
  const [data, setData] = useState({
    gender: '',
    name: {
      first: '',
      last: '',
    },
    picture: {
      large: '',
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
    setChangeData('test');
  }, []);

  return (
    <>
      <Card width="100%">
        <Card.Body>
          hello this is Test
          <div style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
            <img
              src={data.picture.large}
              alt="thumbnail"
              style={{ width: '400px', height: '400px' }}
            />
          </div>
        </Card.Body>
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
      large: '',
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
      console.log(response);
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
        <div style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
          <img
            src={data.picture.large}
            alt="thumbnail"
            style={{ width: '400px', height: '400px' }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecommendResult;
