import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'primary' | 'destructive';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private counter = 0;

  show(
    message: string,
    type: 'primary' | 'destructive' = 'destructive',
    duration = 5000
  ) {
    const id = this.counter++;
    const toast: ToastMessage = { id, type, text: message };

    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, toast]);

    setTimeout(() => {
      this.dismiss(id);
    }, duration);
  }

  dismiss(id: number) {
    const updated = this.messagesSubject.value.filter((item) => item.id !== id);
    this.messagesSubject.next(updated);
  }
}
