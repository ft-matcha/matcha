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

export interface InputContainerProps {
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