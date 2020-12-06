import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import counterReducer from './modules/counter/counterSlice';
import todoReducer from './modules/todo/todoSlice';

const middleware = [...getDefaultMiddleware()];
// if (process.env.NODE_ENV === `development`) {
//   middleware.push(logger);
// }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
