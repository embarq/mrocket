import { FirebaseService } from './firebase-service';
import { AppError } from './app-error';

export class FirestoreService {
  private firestore = FirebaseService.Instance.getFirestore();

  createUserProfile(userData: any) {
    return this.firestore.collection('profiles').add(userData);
  }

  getUserProfile(uid: string) {
    return this.firestore
      .collection('profiles')
      .where('uid', '==', uid)
      .get()
      .then(snap => {
        if (snap.size < 1) {
          throw new AppError('User profile not found', 'app/user-not-found');
        }
        return snap.docs[0];
      });
  }

  static Instance = new FirestoreService();
}