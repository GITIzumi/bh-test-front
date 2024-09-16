import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, map, merge, Observable, of, Subject, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ConnectedUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private router = inject(Router);

  signupSubject = new Subject();
  loginSubject = new Subject();

  isLoginMode = false;


  switchMode() {
    console.log('click');
    this.isLoginMode = !this.isLoginMode;
  }

  $statusObservable: Observable<string> = merge(this.signup(), this.login());

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private signup() {
    return this.signupSubject.pipe(
      switchMap(() => this.http.post<ConnectedUser>('http://localhost:3001/auth/signup', this.formLogin.value).pipe(
        map((user: ConnectedUser) => {

          return 'Success: ' + user.username;
        }),
        catchError((err: any, _caught: Observable<any>) => {

          if (err.status === 403) {
            return of('Access denied');
          }

          if (err.status === 500) {
            return of("Server error");
          }

          return of('Something went wrong');

        }))
      ))
  }

  private login() {
    return this.loginSubject.pipe(switchMap(() => this.http.post<ConnectedUser>('http://localhost:3001/auth/login', this.formLogin.value).pipe(
      map((user: ConnectedUser) => {

        this.auth.setCurrentUserValue(user);

        this.router.navigate(['/chart']);

        return 'Connected: ' + user.username;

      }),
      catchError((err: any, _caught: Observable<any>) => {

        if (err.status === 403) {
          return of('Access denied');
        }

        if (err.status === 500) {
          return of("Server error");
        }

        return of('Something went wrong');

      }))
    ))
  }

  onSubmit() {
    //To Do: check if form is valid

    if (this.isLoginMode) {

      this.loginSubject.next('');
    } else {
      this.signupSubject.next('');
    }
  }

}
