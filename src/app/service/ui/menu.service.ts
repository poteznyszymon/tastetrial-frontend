import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private detailsMenuOpen = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setIsDetailsMenuOpen(value: boolean) {
    this.detailsMenuOpen.next(value);
  }

  public getIsDetailsMenuOpen(): Observable<boolean> {
    return this.detailsMenuOpen.asObservable();
  }
}
