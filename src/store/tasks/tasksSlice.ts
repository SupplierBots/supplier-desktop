import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'main/types/Task';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {
    addTask: (state, { payload }: PayloadAction<{ task: Task }>) => {
      state.push(payload.task);
    },
    updateTask: (state, { payload }: PayloadAction<{ task: Task }>) => {
      return state.map(p => {
        return p.id === payload.task.id ? payload.task : p;
      });
    },
    deleteTask: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(p => p.id !== payload.id);
    },
    deleteAllTasks: () => {
      return [];
    },
  },
});

export const { addTask, updateTask, deleteTask, deleteAllTasks } = tasksSlice.actions;
