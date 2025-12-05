import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null)

  private http = inject(HttpClient)


  //? recuerda que lo computado es de solo lectura

  authStatus = computed<AuthStatus>(() => {
    //
    if (this._authStatus() === 'checking') return 'checking'
    //si esta autenticado
    if (this._user()) {
      return 'authenticated'
    }

    return 'not-authenticated'

  })


  // * son geters que se encargaran para proteger el servicio

  User = computed(() => this._user())
  token = computed(this._token)

  login(email: string, password: string): Observable<boolean> {
    return this.http

      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email,
        password
      }).pipe(
        tap(resp => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token)

          localStorage.setItem('token', resp.token);

        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated')
          return of(false)
        })
      )
  }

}
