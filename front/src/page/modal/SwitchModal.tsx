import Modal, { ModalBody, ModalHeader } from '@/components/ui/Modal';

interface ModalProviderProps {
  setModal: (key: any) => void;
  children: React.ReactNode;
  header: string;
  width?: string;
}

export const ModalChild: React.FC<ModalProviderProps> = ({ children, header, setModal }) => {
  return (
    <Modal width="600px" height="500px" onToggle={() => setModal({ modalType: '', toggle: false })}>
      <ModalHeader>
        <button onClick={() => setModal({ modalType: '', toggle: false })}>X</button>
      </ModalHeader>
      <ModalBody> {children}</ModalBody>
    </Modal>
  );
};

export default ModalChild;
