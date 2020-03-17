import { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Task } from 'main/types/Task';
import { createUserDataSlice } from 'store/ createUserDataSlice';
import { TaskStatus } from 'main/types/TaskStatus';

export const tasksSlice = createUserDataSlice<Task, SliceCaseReducers<Task[]>>({
  name: 'tasks',
  reducers: {
    updateTaskState(state: Task[], { payload }: PayloadAction<{ id: string; status: TaskStatus }>) {
      const task = state.find(t => t.id === payload.id);
      if (task) task.status = payload.status;
    },
  },
});

export const {
  add: addTask,
  update: updateTask,
  remove: removeTask,
  removeAll: removeAllTasks,
} = tasksSlice.actions;
