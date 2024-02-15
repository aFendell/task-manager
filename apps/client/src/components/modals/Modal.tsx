import * as React from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../ui/Dialog';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  body,
  footer,
}: ModalProps) => {
  return (
    <DialogRoot modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='max-w-xs rounded-md sm:max-w-md'>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {body && <div className='grid gap-4 py-4'>{body}</div>}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
