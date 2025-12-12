import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })

export class AuthService {



  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'))

  private http = inject(HttpClient)

  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  })

  //? recuerda que lo computado es de solo lectura

  authStatus = computed<AuthStatus>(() => {
    //
    if (this._authStatus() === 'checking') return 'checking';
    //si esta autenticado
    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';

  });


  // * son geters que se encargaran para proteger el servicio

  user = computed(() => this._user())
  token = computed(this._token)

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password
      }).pipe(
        map((resp) => this.validacionesLogin(resp)),
        catchError((error: any) => this.handleAuthError(error))
      )
  }

  register(email: string, password: string, nombre: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/Register`, {
      email,
      password,
      nombre
    }).pipe(
      map((resp) => this.validacionesLogin(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }


  // *

  checkStatus(): Observable<boolean> {

    //?obtener token de local storage
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout()
      return of(false)
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // },
    }).pipe(
      map((resp) => this.validacionesLogin(resp)),
      catchError((error: any) => this.handleAuthError(error)),
    )


  }


  //logout

  logout() {
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('not-authenticated')
    //token en el sotrage
    localStorage.removeItem('token')

  }



  private validacionesLogin({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token)

    localStorage.setItem('token', token);

    return true;

  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false)
  }

}
