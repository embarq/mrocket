type EventEmitterListener<T> = (value: T) => void;

export class EventEmitter<T = unknown> {
  private listeners: Array<EventEmitterListener<T>>;

  constructor() {
    this.listeners = [];
  }

  subscribe(fn: EventEmitterListener<T>) {
    this.listeners.push(fn);
  }

  emit(data: T) {
    for (let listener of this.listeners) {
      listener(data);
    }
  }

  unsubscibe() {
    this.listeners = undefined as any;
  }
}