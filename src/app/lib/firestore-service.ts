import { FirebaseService } from './firebase-service';
import { AppError } from './app-error';

export class FirestoreService {
  private firestore = FirebaseService.Instance.getFirestore();

  static Instance = new FirestoreService();
}