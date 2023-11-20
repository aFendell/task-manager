import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from './Dialog';

type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Modal = ({
  open,
  setOpen,
  title,
  description,
  body,
  footer,
}: DialogProps) => {
  return (
    <DialogRoot modal open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
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
