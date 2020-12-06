import React from 'react';
import styles from '../Todo.module.css';

type DeleteTodoProps = {
  onClick: () => void
}

const DeleteTodo: React.SFC<DeleteTodoProps> = ({ onClick }) => {
  return (
    <div className={styles.add}>
      <button
        className={styles.btn}
        onClick={() => onClick()}
      >
        Delete Completed Todo
      </button>
    </div>
  );
};

export default DeleteTodo;
