import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import useApi from '@/hooks/useApi';
import UserStep from '../step/UserStep';
import { RegisterFormProps } from '@/types';

export const StyledProfile = styled.div<{ width?: string; height?: string }>`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 15px;
  width: ${({ width }) => (width ? width : '100%')};
  * {
    font-size: 22px;
    padding-bottom: 3px;
  }
  @media screen and (min-width: 768px) {
    max-width: 768px;
  }
`;

const Profile = () => {
  const navigator = useNavigate();
  const { state } = useLocation();
  const [profile, setProfile] = useState<RegisterFormProps>(state);
  const api = useApi();
  const fetchApi = async (data: Record<string, any>) => {
    api('put', 'user', data).then((res) => {
      console.log(res);
    });
  };
  if (!profile) {
    return <></>;
  }
  useEffect(() => {
    setProfile(state);
  }, []);
  return (
    <>
      <UserStep title="profile" defaultData={profile} status="profile" submit={fetchApi}>
        <Button onClick={() => navigator('/explorer')}>Home</Button>
      </UserStep>
      profile
    </>
  );
};

export default Profile;
