import React, { useState } from 'react';
import styles from '../Todo.module.css';

type AddTodoProps = {
  onClick: (text: string) => void
}

const AddTodo: React.SFC<AddTodoProps> = ({ onClick }) => {
  const [text, setText] = useState('');

  return (
    <div className={styles.add}>
      <input
        className={styles.textbox}
        value={text}
        onChange={e => setText(e.target.value)}
        type='text'
      />
      <button
        className={styles.btn}
        onClick={() => {
          if (!text) return;
          onClick(text);
          setText('');
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
