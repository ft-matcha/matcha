import { InputContainerProps } from '@/types';

export const userInfo: InputContainerProps[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    required: true,
    placeholder: 'test@example.com',
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
  },
];
export const userRegister: InputContainerProps[] = [
  {
    name: 'name',
    id: 'name',
    type: 'text',
    required: true,
    placeholder: 'name',
  },
  {
    name: 'email',
    id: 'email',
    type: 'email',
    required: true,
    placeholder: 'test@example.com',
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
  },
];

export const userGender = ['male', 'female', 'other'];

export const dropData = [
  {
    name: '흐르는 강물을',
    id: 'river',
  },
  {
    name: '거꾸로 거슬러 오르는',
    id: 'upstream',
  },
  {
    name: '연어들의',
    id: 'salmon',
  },
];