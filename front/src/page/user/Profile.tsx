import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { userRegister } from '@/data/AuthData';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { userGender } from '../../data/AuthData';
import { createPortal } from 'react-dom';
import FormContainer, { formHandler } from '@/components/ui/Form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SwitchContainer from '@/components/SwitchContainer';
import Input from '@/components/ui/input';

export const StyledProfile = styled(FormContainer)`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  padding-top: 50px;
  margin-top: 55px;
  border-top: 1px;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
`;

const Profile = () => {
  const main = document.getElementById('main');
  const naviagtor = useNavigate();
  const api = useContext(ApiContainers);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    const result = api.call(
      'get',
      'profile',
      {
        withCredentials: true,
      },
      'https://randomuser.me/api',
    );
    console.log(result);
    const success = (pos: any) => {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude });
    };
    const error = () => {
      console.log('error');
    };
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  return (
    <>
      <StyledProfile
        onSubmit={(e) => {
          e.preventDefault();
          const obj = formHandler(e.currentTarget);
          const result = api.call('put', 'profile', obj);
          console.log(result);
        }}
      >
        <div style={{ width: '100%', height: '40px', fontSize: '22px' }}>
          <h1>Change Profile</h1>
        </div>
        {userRegister.map((item) => {
          if (item.name === 'password') return null;
          return <SwitchContainer key={'profile_' + item.name} {...item} required={false} />;
        })}
        <Select id="gender" name="gender">
          {userGender.map((item: string) => (
            <option value={item} key={`gender_key${item}`}>
              {item}
            </option>
          ))}
        </Select>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            name="latitud"
            id="latitude"
            type="text"
            readOnly={true}
            value={location.latitude + ''}
          />
          <Input
            name="longitude"
            id="longitude"
            type="text"
            readOnly={true}
            value={location.longitude + ''}
          />
        </div>
        <div>
          <Button>Update</Button>
          <Link to="change_password">
            <Button>change_password</Button>
          </Link>
        </div>
      </StyledProfile>
      {main &&
        createPortal(
          <div>
            <Outlet
              context={[
                <Button
                  onClick={() => {
                    naviagtor(-1);
                  }}
                >
                  Test
                </Button>,
              ]}
            />
          </div>,
          main,
        )}
    </>
  );
};

export default Profile;
