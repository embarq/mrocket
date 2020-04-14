export interface TaskMetadata {
  id: string;
  createdAt: number;      // as timestamp
  updatedAt: number;      // as timestamp
  completedAt: number;    // as timestamp
  createdBy: string;
}

export interface Task {
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: number | null; // as timestamp
}

export type TaskResource = Task & TaskMetadata;