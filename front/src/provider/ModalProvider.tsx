import SearchModal from '@/page/modal/SearchModal';
import { ModalChild } from '@/page/modal/SwitchModal';
import { ModalProps } from '@/types';
import { cloneElement, createContext, useEffect, useState } from 'react';
import { lazy } from 'react';
import ProfileList from '@/page/user/ProfileOther';

export const ModalContext = createContext({
  modalProp: {
    modalType: '',
    toggle: true,
  },
  setModal: (modalProp: any) => {},
});

const RecommendResult = lazy(() => import('@/page/recommend/RecommendResult'));

const ModalType: {
  [key: string]: React.ReactElement;
} = {
  recommendModal: <RecommendResult />,
  profileModal: <ProfileList />,
};

const ModalProvider: React.FC<ModalProps> = ({ children }) => {
  const [modalProp, setModal] = useState<{
    modalType: string;
    toggle: boolean;
    data?: Record<string, any>;
  }>({
    modalType: '',
    toggle: false,
  });
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
                {cloneElement(ModalType[modalProp.modalType], modalProp.data)}
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
