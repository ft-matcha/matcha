import Modal, { ModalBody, ModalHeader } from '@/components/ui/Modal';
import Input from '@/components/ui/input';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { ModalContext } from '@/provider/ModalProvider';
import debounce from '@/utils/debounce';
import { useCallback, useContext, useEffect, useState } from 'react';

const SearchModal = () => {
  const value = useContext(ModalContext);
  const api = useContext(ApiContainers);
  const [text, setText] = useState('');
  const [print, setPrint] = useState<any>([]);
  const setChangeData = useCallback(
    debounce(async (data: any) => {
      const { results } = (await api.call(
        'get',
        'register',
        data,
        'https://randomuser.me/api',
      )) as any;
      setPrint(([...prev]: any) => {
        if (prev.length > 0) {
          return [...prev, results[0]];
        }
        return [results[0]];
      });
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
        setTimeout(
          () =>
            value.setModal({
              modalType: '',
              toggle: false,
            }),
          400,
        )
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
      <ModalBody
        onScroll={(e: WheelEvent) => {
          e.stopPropagation();
          console.log('hihi');
        }}
      >
        {/* {text} */}
        {print?.map((item: any, index: number) => (
          <span key={item.id.value + index}>{item.name.first + item.name.last}</span>
        ))}
        {print?.map((item: any, index: number) => (
          <span key={item.id.value + '100' + index}>{item.name.first + item.name.last}</span>
        ))}
        {print?.map((item: any, index: number) => (
          <span key={item.id.value + '200' + index}>{item.name.first + item.name.last}</span>
        ))}
      </ModalBody>
    </Modal>
  );
};

export default SearchModal;
