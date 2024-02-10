import Modal, { ModalBody, ModalHeader } from '@/components/ui/Modal';
import Input from '@/components/ui/input';
import { ModalContext } from '@/provider/ModalProvider';
import debounce from '@/utils/debounce';
import { useCallback, useContext, useState } from 'react';

const SearchModal = () => {
  const value = useContext(ModalContext);
  const [text, setText] = useState('');
  const setChangeData = useCallback(
    debounce((data: any) => {
      setText(data);
    }, 400),
    [],
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setChangeData(value);
  };

  return (
    <Modal
      width={'300px'}
      onToggle={() =>
        value.setModal({
          modalType: '',
          toggle: false,
        })
      }
    >
      <ModalHeader>
        <Input onChange={onChange} />
        <button
          onClick={() => {
            value.setModal({
              modalType: '',
              toggle: false,
            });
          }}
        >
          close
        </button>
      </ModalHeader>
      <ModalBody>{text}</ModalBody>
    </Modal>
  );
};

export default SearchModal;
