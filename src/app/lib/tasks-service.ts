import { FirebaseService } from "./firebase-service";
import { Task, TaskResource } from "../model/task.model";
import { AuthService } from "./auth-service";
import { QueryChangeObserver } from './firestore-query-observer';

export class TasksService {
  private readonly collection = 'tasks';

  private firestore = FirebaseService.Instance.getFirestore();
  private auth = AuthService.Instance;

  upsertTask(task: Task) {
    const taskPayload = {
      ...task,
      createdAt: FirebaseService.Instance.getFirebaseTimestamp().now(),
      updatedAt: FirebaseService.Instance.getFirebaseTimestamp().now(),
      createdBy: this.auth.getCurrentUser()?.uid,
      completedAt: null
    }

    return this.firestore
      .collection(this.collection)
      .add(taskPayload)
      .then(snap => {
        return this.firestore
          .collection(this.collection)
          .doc(snap.id)
          .update({ id: snap.id })
          .then(() => ({ taskId: snap.id }))
      })
  }

  updateTask(id: string, payload: Partial<Task>) {
    const timestampNow = FirebaseService.Instance.getFirebaseTimestamp().now();
    const update: Partial<TaskResource> = {
      ...payload,
      updatedAt: timestampNow
    };

    if (payload.completed === true) {
      update.completedAt = timestampNow;
    } else if (payload.completed === false) {
      update.completedAt = null;
    }

    return this.firestore
      .collection(this.collection)
      .doc(id)
      .update(payload);
  }

  deleteTask(id: string) {
    return this.firestore
      .collection(this.collection)
      .doc(id)
      .delete();
  }

  onUserTasksChanges() {
    const currentUserId = this.auth.getCurrentUser()?.uid;
    const query = this.firestore.collection(this.collection).where('createdBy', '==', currentUserId);
    return new QueryChangeObserver<TaskResource>(query);
  }

  static readonly Instance = new TasksService();
}