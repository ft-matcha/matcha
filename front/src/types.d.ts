export interface InputContainerProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  notFocus?: boolean;
  children?: React.ReactNode;
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
