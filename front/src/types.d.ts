export interface IWindow extends Window {
  kakao: {
    maps: {
      Map: any;
      LatLng: any;
      event: any;
      services: any;
    };
  };
}
export interface FormProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  ref?: RefObject<HTMLFormElement>;
}


export interface RegisterFormProps {
  [key: keyof RegisterFormProps]: RegisterFormProps[key];
  address: string;
  date: string | undefined;
  email: string;
  firstName: string;
  gender: string;
  preference: string;
  id: string;
  image: null;
  lastName: string;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  tag: string | null;
}

export interface LocationProps {
  address: string;
  coord: {
    latitude: number;
    longitude: number;
  };
}

export interface InputContainerProps {
  [k: keyof InputContainer]: InputContainerProps[k];
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  notFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: string;
  readOnly?: boolean;
  value?: string;
  pattern?: string;
}

export interface ModalProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
  onToggle?: (props?: any) => void;
  onScroll?: (e: WheelEvent) => void;
}

export interface ModalBodyProps {
  onScroll?: (e: WheelEvent) => void;
  height?: string;
}

export interface CardProps {
  [key: string]: ReactNode | string | undefined;
  width?: string;
  borderRadius?: string;
  children?: ReactNode;
}

export interface ModalContextProps {
  setModal: (prev: {
    modalProp: {
      modalType: string;
      toggle: boolean;
    };
  }) => void | {
    modalType: string;
    toggle: boolean;
  };
}