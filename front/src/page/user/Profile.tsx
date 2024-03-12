import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { userRegister } from '@/data/AuthData';
import { ApiContainers  } from '@/provider/ApiContainerProvider';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { userGender } from '../../data/AuthData';
import { createPortal } from 'react-dom';
import FormContainer, { formHandler } from '@/components/ui/Form';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SwitchContainer from '@/components/SwitchContainer';
import Input from '@/components/ui/input';
import Span from '@/components/ui/Span';
import useApi from '@/hooks/useApi';

export const StyledProfile = styled(FormContainer)`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  flex-direction: column;
  width: 100%;
`;

const Profile = () => {
  const main = document.getElementById('main');
  const navigator = useNavigate();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const { state } = useLocation();
  const api = useApi();

  let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  const fetchApi = async() => {
	const result = await api('get', 'user');
	if (!result) {
		navigator('/')
	}
  }
  useEffect(() => {
	fetchApi();
    // const success = (pos: any) => {
    //   const crd = pos.coords;
    //   setLocation({ latitude: crd.latitude, longitude: crd.longitude });
    // };
    // const error = () => {
    //   console.log('error');
    // };
    // navigator.geolocation.watchPosition(success, error, options);
  }, []);

  return (
    <>
      <StyledProfile
	  	width="80%"
		height="fit-content"
        onSubmit={(e) => {
          e.preventDefault();
          const obj = formHandler(e.currentTarget);
          api('put', 'user', obj);
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Span
            name="latitud"
            id="latitude"
            type="text"
            readOnly={true}
            value={location.latitude + ''}
          />
          <Span
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
                    navigator(-1);
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
