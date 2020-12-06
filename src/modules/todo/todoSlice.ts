import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const FilterTypes = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export type TodoItemType = {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoType = {
  todos: TodoItemType[];
  filterType: string;
  loading: boolean;
  error: string | null;
}

const initialState: TodoType = {
  todos: [],
  filterType: 'SHOW_ALL',
  loading: false,
  error: null
};

// reducers
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    add: (state, action: PayloadAction<TodoItemType>) => {
      state.todos.push(action.payload);
    },
    destroy: (state, action: PayloadAction<number[]>) => {
      state.todos = state.todos.filter(todo => {
        return !action.payload.includes(todo.id);
      });
    },
    toggle: (state, action: PayloadAction<TodoItemType['id']>) => {
      const targeIdx = state.todos
        .findIndex(todo => todo.id === action.payload);
      state.todos[targeIdx].completed =
        !state.todos[targeIdx].completed;
    },
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    failure: (state, action: PayloadAction<TodoType['error']>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSuccess: (state, action: PayloadAction<TodoType['todos']>) => {
      state.loading = false;
      state.error = null;
      state.todos = action.payload;
    },
  },
});

export const {
  filter,
  add,
  destroy,
  toggle,
  fetchStart,
  fetchSuccess,
  failure,
} = todoSlice.actions;

// selectors
export const selector = (state: RootState) => {
  return { ...state.todo };
};

export default todoSlice.reducer;
