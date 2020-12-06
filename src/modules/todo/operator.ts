// operators
import {
  TodoItemType,
  add,
  toggle,
  destroy,
  failure,
  fetchStart,
  fetchSuccess,
} from './todoSlice';

const getTodos = async () => {
  const response = await fetch('http://localhost:1234/todos');
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
  return json;
};

export const fetchTodos = () => async (dispatch: any) => {
  try {
    dispatch(fetchStart());
    dispatch(fetchSuccess(await getTodos()));
  } catch (error) {
    dispatch(failure(error.stack))
  }
};

const postTodo = async (todo: TodoItemType) => {
  const response = await fetch('http://localhost:1234/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
  return json;
};

export const handleAdd = (
  text: string
) => async (dispatch: any) => {
  try {
    const todo = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      text: text,
      completed: false,
    };
    await postTodo(todo);
    dispatch(add(todo));
  } catch (error) {
    dispatch(failure(error.stack));
  }
};

const putTodo = async (todo: TodoItemType) => {
  const id = todo.id;
  const response = await fetch('http://localhost:1234/todos/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: todo.text,
      completed: todo.completed,
    })
  });
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
  return json;
};

export const handleToggle = (
  todo: TodoItemType
) => async (dispatch: any) => {
  try {
    const completed = !todo.completed;
    await putTodo({ ...todo, completed });
    dispatch(toggle(todo.id));
  } catch (error) {
    dispatch(failure(error.stack))
  }
};

const deleteTodos = async (ids: number[]) => {
  const responses = ids.map(id => {
    return fetch('http://localhost:1234/todos/' + id, {
      method: 'DELETE'
    });
  });

  await Promise.all(responses);
};

export const handleDelete = () => async (
  dispatch: any,
  getState: any
) => {
  try {
    const completedIds = getState().todo.todos
      .filter((todo: TodoItemType) => todo.completed)
      .map((todo: TodoItemType) => todo.id);

    await deleteTodos(completedIds);
    dispatch(destroy(completedIds));
  } catch (error) {
    dispatch(failure(error.stack))
  }
};
