import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private loginSubject = new Subject<boolean>();
  private registerSubject = new Subject<boolean>();

  openLoginModal(): Observable<boolean> {
    // Aquí implementarás la lógica para abrir el modal de login
    return this.loginSubject.asObservable();
  }

  openRegisterModal(): Observable<boolean> {
    // Aquí implementarás la lógica para abrir el modal de registro
    return this.registerSubject.asObservable();
  }
} 