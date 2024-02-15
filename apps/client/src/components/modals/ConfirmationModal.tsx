import { Button, type ButtonProps } from '../ui/Button';
import { Modal, type ModalProps } from './Modal';

export type Action = ButtonProps & {
  key: string;
};

type Props = ModalProps & {
  actions: Action[];
};

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  actions,
  title,
  body,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      body={body}
      footer={
        <>
          {actions.map((action) => (
            <Button {...action} />
          ))}
        </>
      }
    />
  );
};

export default ConfirmationModal;
