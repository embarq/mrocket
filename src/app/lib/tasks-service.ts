import { FirebaseService } from "./firebase-service";
import { Task, RemoteTaskResource, TaskResource } from "../model/task.model";
import { AuthService } from "./auth-service";
import { QueryChangeObserver } from './firestore-query-observer';
import { timestampToMilliseconds } from "./utils";

export class TasksService {
  private readonly collection = 'tasks';

  private firestore = FirebaseService.Instance.getFirestore();
  private auth = AuthService.Instance;

  createTask(task: Task) {
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
    const update: Partial<RemoteTaskResource> = {
      ...payload,
      updatedAt: timestampNow
    };

    return this.getTask(id).then(task => {
      if (payload.completed !== task.completed) {
        if (payload.completed === true) {
          update.completedAt = timestampNow;
        } else if (payload.completed === false) {
          update.completedAt = null;
        }
      }

      return this.firestore
        .collection(this.collection)
        .doc(id)
        .update(update);
    })
    .then(() => ({ taskId: id }))
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
    return new QueryChangeObserver<RemoteTaskResource>(query);
  }

  getTask(id: string): Promise<TaskResource> {
    type Timestamp = firebase.firestore.Timestamp;
    const docRef = this.firestore.collection(this.collection).doc(id);

    return docRef.get().then(snap => {
      const doc = snap.data() as RemoteTaskResource;
      return {
        ...doc,
        createdAt: timestampToMilliseconds(doc.createdAt) as number,
        updatedAt: timestampToMilliseconds(doc.updatedAt) as number,
        completedAt: timestampToMilliseconds(doc.completedAt as Timestamp)
      }
    })
  }

  static readonly Instance = new TasksService();
}