import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { userRegister } from '@/data/AuthData';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { userGender } from '../../data/AuthData';
import FormContainer, { formHandler } from '@/components/ui/Form';
import { Link } from 'react-router-dom';

export const StyledProfile = styled(FormContainer)`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  padding-top: 50px;
  margin-top: 55px;
  border-top: 1px;
  flex-direction: column;
  justify-content: center;
`;

const Profile = () => {
  const api = useContext(ApiContainers);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  let options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    api.call('get', 'profile', {
      withCredentials: true,
    });
    const success = (pos: any) => {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude });
    };
    const error = () => {
      console.log('error');
    };
    navigator.geolocation.watchPosition(success, error, options);
  }, []);
  // if api connected placeholder = profile.data

  return (
    <StyledProfile
      onSubmit={(e) => {
        e.preventDefault();
        const obj = formHandler(e.currentTarget);
        console.log(obj);
      }}
    >
      <div style={{ width: '100%', height: '40px' }}>
        <h1>Change Profile</h1>
      </div>

      {userRegister.map((item) => {
        return (
          item.id !== 'password' && (
            <InputContainer {...item} required={true} key={`user_${item.id}`} />
          )
        );
      })}

      <Select id="gender" name="gender">
        {userGender.map((item: string) => (
          <option value={item} key={`gender_key${item}`}>
            {item}
          </option>
        ))}
      </Select>
      <span>
        {location.latitude} {location.longitude}
      </span>
      <div>
        <Button>Update</Button>
        <Link to="change_password">
          <Button>change_password</Button>
        </Link>
      </div>
    </StyledProfile>
  );
};

export default Profile;
