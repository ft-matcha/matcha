import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { userRegister } from '@/data/AuthData';
import { ApiContainers  } from '@/provider/ApiContainerProvider';
import React, {
  FormEvent,
  ReactEventHandler,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { userGender } from '../../data/AuthData';
import { createPortal } from 'react-dom';
import FormContainer, { formHandler } from '@/components/ui/Form';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SwitchContainer from '@/components/SwitchContainer';
import Span from '@/components/ui/Span';
import useApi from '@/hooks/useApi';
import GeoLocation from '@/page/location/GeoLocation';
import useKakao from '@/hooks/useKakao';

export const StyledProfile = styled(FormContainer)`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  flex-direction: column;
  width: 100%;
`;

const Profile = () => {
  const navigator = useNavigate();
  const memoKakao = useMemo(() => GeoLocation, []);
  const [profile, setProfile] = useState<{
    address: string;
    age: number | null;
    email: string;
    firstName: string;
    gender: string;
    id: string;
    image: null;
    lastName: string;
    phone: string | null;
    status: 'ACTIVE';
    tag: string | null;
  }>();
  const addressRef = useRef<{
    address: string;
    coord: {
      latitude: number;
      longitude: number;
    };
  } | null>(null);
  const api = useApi();
  const fetchApi = async (e?: FormEvent<any>) => {
    e?.preventDefault();
    if (e && profile) {
      await api('put', 'user', Object.assign(profile, { address: addressRef.current?.address }));
      return;
    }
    const result = await api('get', 'user');
    console.log(result.data);
    setProfile(result.data);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <StyledProfile width="80%" height="fit-content" onSubmit={fetchApi}>
        <div style={{ width: '100%', height: '40px', fontSize: '22px' }}>
          <h1>Change Profile</h1>
        </div>
        <div>{profile?.firstName}</div>
        <Select id="gender" name="gender">
          {userGender.map((item: string) => (
            <option value={item} key={`gender_key${item}`}>
              {item}
            </option>
          ))}
        </Select>
        <div style={{ display: 'flex', flexDirection: 'row' }}></div>
        <div>
          <Button>Update</Button>
          <Link to="change_location">
            <Button>change_location</Button>
          </Link>
          <Link to="change_password">
            <Button>change_password</Button>
          </Link>
          <GeoLocation addressRef={addressRef}></GeoLocation>
          <Span>{addressRef.current?.address}</Span>
        </div>
      </StyledProfile>
    </>
  );
};

export default Profile;
