import { FirebaseService } from "./firebase-service";
import { Task, TaskResource } from "../model/task.model";
import { AuthService } from "./auth-service";
import { createId } from "./utils";

export class TasksService {
  private readonly collection = 'tasks';

  private firestore = FirebaseService.Instance.getFirestore();
  private auth = AuthService.Instance;

  upsertTask(task: Task) {
    const uid = this.auth.getCurrentUser()?.uid;
    const taskPayload = {
      ...task,
      id: createId({ uid, t: this.auth.getCurrentUser()?.refreshToken }),
      createdAt: FirebaseService.Instance.getFirebaseTimestamp().now(),
      updatedAt: FirebaseService.Instance.getFirebaseTimestamp().now(),
      completedAt: null,
      createdBy: this.auth.getCurrentUser()?.uid
    }

    return this.firestore
      .collection(this.collection)
      .add(taskPayload)
      .then(snap => ({ taskId: taskPayload.id }))
  }

  /**
   * @returns "unsubscribe" function
   */
  getTasks(handler: (tasks: TaskResource[]) => void) {
    const currentUserId = this.auth.getCurrentUser()?.uid;
    const query = this.firestore.collection(this.collection).where('createdBy', '==', currentUserId);
    
    return query.onSnapshot(snap => {
      const docs = snap.docs.map(doc => doc.data());
      handler(docs as TaskResource[]);
    });
  }

  fetchTasks() {
    const currentUserId = this.auth.getCurrentUser()?.uid;
    return this.firestore
      .collection(this.collection)
      .where('createdBy', '==', currentUserId)
      .get()
      .then(snap => snap.docs.map(doc => doc.data()) as TaskResource[])
  }

  fetchLocalTasks() {
    return new Promise((resolve, reject) => {
      try {
        const tasks = localStorage.getItem('MROCKET_TASKS');

        if (tasks == null) {
          return reject(new Error('Cached tasks not found'));
        }

        resolve(
          JSON.parse(tasks || '')
        );
      } catch(err) {
        reject(err);
      }
    })
  }

  static readonly Instance = new TasksService();
}