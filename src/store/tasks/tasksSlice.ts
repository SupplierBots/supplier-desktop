import { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Task } from 'main/types/Task';
import { createUserDataSlice } from 'store/ createUserDataSlice';
import { TaskStatus, TaskStatusType } from 'main/types/TaskStatus';

export const tasksSlice = createUserDataSlice<Task, SliceCaseReducers<Task[]>>({
  name: 'tasks',
  reducers: {
    updateTaskStatus(
      state: Task[],
      { payload }: PayloadAction<{ id: string; status: TaskStatus }>,
    ) {
      const task = state.find(t => t.id === payload.id);
      if (task) task.status = payload.status;
    },
    setTaskActivity(state: Task[], { payload }: PayloadAction<{ id: string; isActive: boolean }>) {
      const task = state.find(t => t.id === payload.id);
      if (task) {
        task.isActive = payload.isActive;

        if (
          !payload.isActive &&
          task.status.message !== 'Success' &&
          task.status.message !== 'Sold Out' &&
          task.status.message !== 'Duplicate Order'
        ) {
          task.status = {
            message: 'Inactive',
            type: TaskStatusType.Inactive,
          };
        }
      }
    },
  },
});

export const {
  add: addTask,
  update: updateTask,
  remove: removeTask,
  removeAll: removeAllTasks,
  setTaskActivity,
  updateTaskStatus,
} = tasksSlice.actions;
