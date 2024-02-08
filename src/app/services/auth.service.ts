import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8090/auth/'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  login(nickname: string, password: string):Observable<any>{
    return this.http.post(
      AUTH_API +'login',
      {
        "nickname" : nickname,
        "password" : password,
      },
      httpOptions
    );
  }
  register(nickname: string,nombre: string, email: string, password: string):Observable<any>{
    return this.http.post(
      AUTH_API+'nuevo',{
        "nickname" : nickname,
        "nombre" : nombre,
        "email" : email,
        "password" : password
      },
      httpOptions
    );
  }
  logout():Observable<any>{
    return this.http.post(AUTH_API+'signout',{},httpOptions);
  }
}
