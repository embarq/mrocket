import { nanoid } from "nanoid";
import { indexedBy } from "./utils";
import { TaskResource } from "../model/task.model";

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
export class QueryChangeObserver<T = firebase.firestore.DocumentData> {
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
        const docs = changes.map(change => change.doc.data());
        this.handlers.forEach(handler => handler.fn(docs as T[]));
        console.log('%c[QueryChangeObserver]: onSnapshot', 'color: #777', changes);
      }
    });
  }
}