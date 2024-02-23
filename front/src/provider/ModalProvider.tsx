import Login from '@/page/auth/Login';
import Register from '@/page/auth/register/Register';
import SearchModal from '@/page/modal/SearchModal';
import { ModalChild } from '@/page/modal/SwitchModal';
import { ModalProps } from '@/types';
import { createContext, useEffect, useState } from 'react';

export const ModalContext = createContext({
  modalProp: {
    modalType: 'searchModal',
    toggle: true,
  },
  setModal: (modalProp: any) => {},
});

const ModalType: {
  [key: string]: React.ReactNode;
} = {
  loginModal: <Login />,
  signUpModal: <Register />,
};

const ModalProvider: React.FC<ModalProps> = ({ children }) => {
  const [modalProp, setModal] = useState({
    modalType: '',
    toggle: false,
  });
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal({
          modalType: '',
          toggle: false,
        });
        return;
      }
      if (e.key === 'k' && e.metaKey) {
        setModal({
          modalType: 'searchModal',
          toggle: true,
        });
      } else if (e.key === 'k' && e.ctrlKey) {
        setModal({
          modalType: 'loginModal',
          toggle: true,
        });
      } else if (e.key === 'l' && e.ctrlKey) {
        setModal({
          modalType: 'signUpModal',
          toggle: true,
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!modalProp.toggle) {
      return;
    }
    const onScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const html = document.querySelector('html') as HTMLElement;
      html.style.overflowY = 'hidden';
    };

    const onRemoveScroll = () => {
      setTimeout(() => {
        const html = document.querySelector('html') as HTMLElement;
        html.style.overflowY = 'auto';
      }, 1000);
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      onRemoveScroll();
    };
  }, [modalProp.toggle]);

  return (
    <>
      <ModalContext.Provider value={{ modalProp, setModal }}>
        {children}
        {modalProp.toggle && (
          <>
            (
            {modalProp.modalType === 'searchModal' ? (
              <SearchModal />
            ) : (
              <ModalChild header={modalProp.modalType} setModal={setModal}>
                {ModalType[modalProp.modalType]}
              </ModalChild>
            )}
            )
          </>
        )}
      </ModalContext.Provider>
    </>
  );
};

export default ModalProvider;
