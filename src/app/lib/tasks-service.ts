import { FirebaseService } from "./firebase-service";
import { Task } from "../model/task.model";
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
      id: createId(uid + '' + Date.now()),
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

  static readonly Instance = new TasksService();
}