import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import * as CONFIG from '../../.runtimeconfig.json';

type FirebaseApp = firebase.app.App;

export class FirebaseService {
  private app: FirebaseApp;

  constructor(appConfig: any) {
    this.app = firebase.initializeApp(appConfig);
  }

  public getFirebaseTimestamp() {
    return firebase.firestore.Timestamp;
  }

  public getAuth() {
    return this.app.auth();
  }

  public getFirestore() {
    return this.app.firestore();
  }

  static Instance = new FirebaseService(CONFIG['webapp_firebase_config']);
}