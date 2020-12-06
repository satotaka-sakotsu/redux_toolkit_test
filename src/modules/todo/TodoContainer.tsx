import React, { useEffect } from 'react';
import Filter from './components/Filter';
import AddTodo from './components/AddTodo';
import DeleteTodo from './components/DeleteTodo';
import List from './components/List';
import { useSelector, useDispatch } from 'react-redux';
import {
  filter,
  selector,
} from './todoSlice';
import {
  fetchTodos,
  handleAdd,
  handleToggle,
  handleDelete,
} from './operator';
import styles from './Todo.module.css';

export const TodoContainer = () => {
  const {
    todos,
    filterType,
    loading,
    error,
  } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <h2 className={styles.title}>Todo App</h2>
      <div>
        <Filter
          filterType={filterType}
          onClick={type => dispatch(filter(type))}
        />
        <AddTodo
          onClick={text => dispatch(handleAdd(text))}
        />
        <DeleteTodo
          onClick={() => dispatch(handleDelete())}
        />
      </div>
      {loading ? (
        <p>...loading</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <List
          todos={todos}
          filterType={filterType}
          onClick={todo => dispatch(handleToggle(todo))}
        />
      )}
    </div>
  );
};
