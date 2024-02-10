export interface InputContainerProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode;
}

export interface ModalProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
  onToggle?: (props?: any) => void;
}

export interface CardProps {
  [key: string]: ReactNode | string | undefined;
  width?: string;
  borderRadius?: string;
  children?: ReactNode;
}
