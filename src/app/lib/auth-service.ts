import { auth } from 'firebase/app';
import { FirebaseService } from "./firebase-service";
import { EventEmitter } from "./event-emitter";
import { FirestoreService } from './firestore-service';

type FirebaseUser = firebase.User | null;

export class AuthService {
  private auth = FirebaseService.Instance.getAuth();
  private currentUser: FirebaseUser = null;
  private authState$ = new EventEmitter<FirebaseUser>();

  constructor() {
    this.auth.setPersistence(auth.Auth.Persistence.LOCAL).catch(err => {
      console.error(err);
    });

    this.auth.onAuthStateChanged(user => {
      console.log('[onAuthStateChanged]', user?.email);
      this.currentUser = user;
      this.authState$.emit(user);
    });
  }

  isAuthenticated() {
    return new Promise<boolean>((resolve) => {
      this.auth.onAuthStateChanged(state => {
        resolve(state != null);
      });
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthStateChange(handler: (user: FirebaseUser) => void) {
    return this.authState$.subscribe(handler);
  }

  login({ email, password }: { email: string, password: string }) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => FirebaseService.Instance.getFirestore().enablePersistence());
  }

  logout() {
    return this.auth.signOut();
  }

  register(user: Partial<FirebaseUser> & { password: string, email: string }) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const userProfile = { ...user, uid: res.user?.uid };
        delete userProfile.password;
        return FirestoreService.Instance.createUserProfile(userProfile);
      });
  }

  static Instance = new AuthService();
}