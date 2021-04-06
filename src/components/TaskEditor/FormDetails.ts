import * as Yup from 'yup';
import { Task } from 'main/types/Task';
import { TaskStatusType } from 'main/types/TaskStatus';

export const taskValidationSchema = Yup.object().shape({
  id: Yup.string(),
  profile: Yup.object().required(),
  proxy: Yup.object().required(),
  safeMode: Yup.boolean().required(),
  products: Yup.array().min(1),
});

export const initialTaskValues: Task = {
  isActive: false,
  id: '',
  profile: null,
  proxy: null,
  safeMode: true,
  products: [],
  status: {
    message: 'Inactive',
    type: TaskStatusType.Inactive,
  },
};
