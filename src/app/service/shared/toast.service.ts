import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private counter = 0;

  show(message: string, duration = 3000) {
    const id = this.counter++;
    const toast: ToastMessage = { id, text: message };

    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, toast]);

    setTimeout(() => {
      this.messagesSubject.next(this.messagesSubject.value.slice(1));
    }, duration);
  }

  dismiss(id: number) {
    const updated = this.messagesSubject.value.filter((item) => item.id !== id);
    this.messagesSubject.next(updated);
  }
}
