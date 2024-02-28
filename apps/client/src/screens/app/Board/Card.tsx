import { motion } from 'framer-motion';

import DropIndicator from './DropIndicator';
import { Task } from 'api/response';
import { H3 } from 'components/ui/Typography';

export type CardProps = Task & {
  onDragStart?: (
    e: MouseEvent | TouchEvent | PointerEvent,
    cardId: string,
  ) => void;
};

const Card = ({ title, description, id, status, onDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={status} />
      <motion.div
        layout
        layoutId={id}
        onDragStart={(e) => {
          if (!onDragStart) return;
          onDragStart(e, id);
        }}
        draggable='true'
        className='cursor-grab border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
      >
        <H3>{title}</H3>
        <p>{description}</p>
      </motion.div>
    </>
  );
};

export default Card;
