import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { userGender } from '@/data/AuthData';
import FormContainer, { formHandler } from '@/components/ui/Form';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Span from '@/components/ui/Span';
import useApi from '@/hooks/useApi';
import GeoLocation from '@/page/location/GeoLocation';
import Label from '@/components/ui/Label';
import UserStep from '../step/UserStep';
import { RegisterFormProps } from '@/types';
import { removeEmptyValue } from '@/utils/utils';

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
  const [profile, setProfile] = useState<RegisterFormProps>();
  const api = useApi();
  const fetchApi = async () => {
    api('get', 'user').then(({ data }) => {
      setProfile(data);
    });
  };
  useEffect(() => {
    fetchApi();
  }, []);
  if (!profile) {
    return <></>;
  }
  return (
    <UserStep
      title="profile"
      api={async (funnelForm, data) => {
        console.log(
          removeEmptyValue(funnelForm, profile as Record<string, any>, (value1: any, value2) => {
            if (!value2) {
              return true;
            }
            if (typeof value1 !== typeof value2) {
              return false;
            }
            if (value1 === value2) {
              return false;
            }
            return true;
          }),
        );
      }}
      funnelData={profile}
    >
      <Button onClick={() => navigator('/explorer')}>Home</Button>
    </UserStep>
  );
};

export default Profile;
