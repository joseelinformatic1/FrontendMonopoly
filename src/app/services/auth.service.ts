import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


const AUTH_API = 'http://localhost:8090/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(nickname: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        "nickname":nickname,
        "password":password,
      },
      httpOptions
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    // Usa una función para devolver el error de manera perezosa
    return throwError(() => new Error(errorMessage));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'nuevo',
      {
        "username":username,
        "email":email,
        "password": password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}

