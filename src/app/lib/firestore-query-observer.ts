import { nanoid } from "nanoid";
import { indexedBy } from "./utils";

type DocumentChange<T = DocumentData> = firebase.firestore.DocumentChange<T>;
type DocumentData = firebase.firestore.DocumentData;

type QueryChangesHandlerFn<T> = (data: T[]) => void;
type QueryChangesHandler<T> = {
  id: string,
  fn: QueryChangesHandlerFn<T>
}

/** 
 * Implements query listeners management - attach and dispose listener.
 * 
 * @example
 * 
 * ```js
 * const query = firestore.collection('collection').where('prop', '==', value);
 * const observer = new QueryChangeObserver<TaskResource>(query);
 * const unsubscribe = observer.subscribe(date => {
 *    // Do stuff
 * });
 * 
 * unsubscribe();
 * ```
 */
export class QueryChangeObserver<T extends { id: string }> {
  private ready = false;
  private handlers: Array<QueryChangesHandler<T>> = [];
  private currentState: T[] = [];

  private _unsubscribe: () => void;
  private indexById: (values: T[]) => { [_key: string]: T; };

  constructor(private query: firebase.firestore.Query) {
    this._unsubscribe = () => { throw new Error('QuerySchanges has not been properly initialized') }
    this.indexById = indexedBy<T>('id');
  }

  kill() {
    if (this.ready) {
      this._unsubscribe();
    }
  }

  unsubscribe(handlerId: string) {
    this.handlers = this.handlers.filter(handler => handler.id !== handlerId);
  }

  subscribe(handler: QueryChangesHandlerFn<T>) {
    const handlerId = nanoid();
    this.handlers.push({
      id: handlerId,
      fn: handler
    });

    if (!this.ready) {
      this.init();
    }

    return () => this.unsubscribe(handlerId);
  }

  private init() {
    this._unsubscribe = this.query.onSnapshot(snap => {
      const changes = snap.docChanges();

      if (changes.length > 0) {
        this.currentState = this.mapChangesToCurrentState(changes);
        this.handlers.forEach(handler => handler.fn(this.currentState));
      }
    });
  }

  private mapChangesToCurrentState(changes: DocumentChange<DocumentData>[]) {
    const entriesMap = this.indexById(this.currentState);

    for (let change of changes) {
      const docId = change.doc.id;

      switch(change.type) {
        case 'removed': {
          delete entriesMap[docId];
          break;
        }
        case 'modified': {
          entriesMap[docId] = Object.assign(
            {},
            entriesMap[docId],
            change.doc.data()
          );
          break;
        }
        case 'added': {
          if (change.doc.data().id == null) {
            break;
          }
          entriesMap[docId] = change.doc.data() as T;
        }
      }
    }

    return Object.values(entriesMap);
  }
}