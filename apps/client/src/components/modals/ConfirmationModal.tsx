import { Button, type ButtonProps } from '../ui/Button';
import { Modal, type ModalProps } from './Modal';

type Props = ModalProps & {
  actions: ButtonProps[];
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
          {actions.map((buttonProps, i) => (
            <Button key={buttonProps.value + i.toString()} {...buttonProps} />
          ))}
        </>
      }
    />
  );
};

export default ConfirmationModal;
