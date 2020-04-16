export interface LocalTaskTimings {
  createdAt: number;
  updatedAt: number;
  completedAt: number | null;
}

export interface RemoteTaskTimings {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  completedAt: firebase.firestore.Timestamp | null;
}

export interface TaskMetadata {
  id: string;
  createdBy: string;
}

export type LocalTaskMetadata = TaskMetadata & LocalTaskTimings;
export type RemoteTaskMetadata = TaskMetadata & RemoteTaskTimings;

export interface Task {
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: number | null; // as timestamp
}

export type RemoteTaskResource = Task & RemoteTaskMetadata;
export type TaskResource = Task & LocalTaskMetadata;