import { ModalContext } from '@/provider/ModalProvider';
import { ModalBodyProps, ModalProps } from '@/types';
import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  top: -50%;
  left: -50%;
  transform: translate(50%, 50%);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div<ModalProps>`
  min-width: 200px;
  min-height: 200px;
  border: 1px solid;
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  height: ${(props) => (props.height ? props.height : 'fit-content')};
  z-index: 10000;
  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  max-height: 80px;
  width: 100%;
  min-height: 20px;
  height: fit-content;
  line-height: fit-content;
  float: right;
  border-bottom: 1px solid;
  justify-content: space-between;
  gap: 15px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundOpacity};
`;

export const ModalBody = styled.div<ModalBodyProps>`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 50;
  overflow-y: scroll;
  height: ${(props) => (props.height ? props.height : '100%')};
  max-height: 480px;
`;

const Modal: React.FC<ModalProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onToggle && props.onToggle();
      }
    };
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, []);

  return (
    <ModalWrapper ref={ref}>
      <ModalOverlay />
      <ModalContainer {...props}>{props.children}</ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
