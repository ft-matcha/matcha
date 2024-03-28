import { InputContainerProps } from '@/types';

export const userInfo: InputContainerProps[] = [
  {
    name: 'uid',
    id: 'uid',
    type: 'id',
    placeholder: 'test',
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
  },
];

export const userRegister = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    required: true,
    placeholder: 'email',
    next: 'password',
  },
  {
    name: 'name',
    id: 'name',
    type: 'text',
    required: true,
    placeholder: 'name',
    next: 'complete',
  },
  {
    name: 'id',
    id: 'id',
    type: 'id',
    required: true,
    placeholder: 'test@example.com',
    next: 'email',
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    next: 'name',
    required: true,
  },
];

export const userGender = ['male', 'female', 'other'];
