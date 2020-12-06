import React from 'react';
import styles from '../Todo.module.css';
import {
  FilterTypes,
  TodoType,
  TodoItemType
} from '../todoSlice';

type ListProps = {
  todos :TodoType['todos'],
  filterType: TodoType['filterType'],
  onClick: (todo: TodoItemType) => void;
}

const List: React.SFC<ListProps> = ({
  todos,
  filterType,
  onClick
}) => {
  const todoNodes = todos
    .filter(item => {
      switch (filterType) {
        case FilterTypes.SHOW_COMPLETED:
          return item.completed;
        case FilterTypes.SHOW_ACTIVE:
          return !item.completed;
        default:
          return true;
      }
    })
    .map((item, idx) => {
      return (
        <li
          key={idx}
          className={`${styles.item} ${item.completed ? styles.active : ''}`}
          onClick={() => onClick(item)}
        >{item.text}</li>
      );
    });

  return (
    <ul className={styles.list}>
      {todoNodes}
    </ul>
  );
};

export default List;
