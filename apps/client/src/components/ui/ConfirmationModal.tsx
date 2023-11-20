import { Button, type ButtonProps } from './Button';
import { Modal, type ModalProps } from './Modal';

type Props = ModalProps & {
  actions: ButtonProps[];
};

const ConfirmationModal = ({ isOpen, setIsOpen, actions }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Delete Task'
      body='Are you sure you want to delete this task?'
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
