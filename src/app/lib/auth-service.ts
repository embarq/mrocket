import * as firebase from 'firebase';
import { FirebaseService } from "./firebase-service";
import { EventEmitter } from "./event-emitter";

type FirebaseUser = firebase.User | null;

export class AuthService {
  private auth = FirebaseService.Instance.getAuth();
  private currentUser: FirebaseUser = null;
  private authState$ = new EventEmitter<FirebaseUser>();

  constructor() {
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(err => {
      console.error(err);
    });

    this.auth.onAuthStateChanged(user => {
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
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  static Instance = new AuthService();
}