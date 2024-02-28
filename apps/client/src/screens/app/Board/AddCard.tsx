import * as React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { TaskStatus } from 'api/response';

type Props = {
  column: TaskStatus;
};

const AddCard = ({ column }: Props) => {
  // TODO: update to React hook form
  const [text, setText] = React.useState('');
  const [adding, setAdding] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    // TODO: Create new Task
    // const newCard: CardProps = {
    //   status: column,
    //   title: text.trim(),
    //   id: Math.random().toString(),
    // };

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form onSubmit={onSubmit} layout>
          <textarea
            onChange={onChange}
            autoFocus
            placeholder='Add new task...'
            className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
          />
          <div className='mt-1.5 flex items-center justify-end gap-1.5'>
            <button
              onClick={() => setAdding(false)}
              className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-transparent hover:text-neutral-50'
            >
              Close
            </button>
            <button
              type='submit'
              onClick={() => setAdding(true)}
              className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
            >
              <span>Add</span>
              <Plus size={16} />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className='flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-transparent hover:text-neutral-50'
        >
          <span>Add Card</span>
          <Plus size={16} />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
