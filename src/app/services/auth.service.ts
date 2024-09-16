import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConnectedUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject!: BehaviorSubject<ConnectedUser | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<ConnectedUser | null>(
      this.getLocalStorageUser()
    );
  }

  private getLocalStorageUser(): ConnectedUser | null {

    let user = localStorage.getItem('currentUser');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public get currentUserValue(): ConnectedUser | null {
    return this.currentUserSubject.value;
  }

  setCurrentUserValue(user: ConnectedUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }


}
