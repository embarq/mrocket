export interface TaskMetadata {
  id: string;
  createdAt: number | firebase.firestore.Timestamp;      // as timestamp
  updatedAt: number | firebase.firestore.Timestamp;      // as timestamp
  completedAt: number | firebase.firestore.Timestamp | null;    // as timestamp
  createdBy: string;
}

export interface Task {
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: number | null; // as timestamp
}

export type TaskResource = Task & TaskMetadata;