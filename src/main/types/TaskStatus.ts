export enum TaskStatusType {
  Inactive = 'Inactive',
  Action = 'Action',
  Success = 'Success',
  Error = 'Error',
}

export interface TaskStatus {
  message: string;
  type: TaskStatusType;
  additionalInfo?: string | number | string[];
}
