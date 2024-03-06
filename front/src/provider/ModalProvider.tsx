import Login from '@/page/auth/Login';
import Register from '@/page/auth/register/Register';
import SearchModal from '@/page/modal/SearchModal';
import { ModalChild } from '@/page/modal/SwitchModal';
import { ModalProps } from '@/types';
import { createContext, useEffect, useState } from 'react';
import RecommendResult from '@/page/recommend/RecommendResult';
import { useNavigate } from 'react-router-dom';

export const ModalContext = createContext({
  modalProp: {
    modalType: '',
    toggle: true,
  },
  setModal: (modalProp: any) => {},
});

const ModalType: {
  [key: string]: React.ReactNode;
} = {
  loginModal: <Login />,
  signUpModal: <Register />,
  recommendModal: <RecommendResult />,
};

const ModalProvider: React.FC<ModalProps> = ({ children }) => {
  const [modalProp, setModal] = useState({
    modalType: '',
    toggle: false,
  });
  const navigator = useNavigate();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalProp.modalType === 'recommendModal') {
          setModal({
            modalType: '',
            toggle: false,
          });
          return;
        }
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
      const html = document.querySelector('html') as HTMLElement;
      html.style.overflowY = 'auto';
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      onRemoveScroll();
    };
  }, [modalProp.toggle]);
  useEffect(() => {}, [modalProp.toggle, modalProp.modalType]);

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
