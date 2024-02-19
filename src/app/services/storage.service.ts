import { Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { UserPayload } from '../interfaces/UserPayload';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    if (typeof window !== 'undefined') {
      let userString = localStorage.getItem(USER_KEY);
      if (userString) {
        try {
          let user = JSON.parse(userString);
       
          // Asegurar que los campos necesarios existan
          user.roles = user.roles || [];
          user.name = user.name || ''; // Asegúrate de que el nombre sea una cadena vacía si no existe
          user.nickname = user.nickname || ''; // Lo mismo para el nickname
          user.email = user.email || ''; // Y para el email
          return user;
        } catch (e) {
          console.error("Error parsing user data from sessionStorage", e);
        }
      }
    }
    // Devolver un objeto de usuario predeterminado si no hay datos o hubo un error
    return { roles: [], name: '', nickname: '', email: '' };
  }

  public isLoggedIn(): boolean {
    if(typeof window !== 'undefined'){
      const user = localStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }
    }
    return false;
  }

  public getUserFromToken(): UserPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        // Decodificar el token y devolver el payload como UserPayload
        return jwtDecode<UserPayload>(token);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
    return null;
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    let Obttoken = localStorage.getItem(USER_KEY);
    if (!Obttoken) {
      return null; // Retorna null si no hay token almacenado
    }
  
    try {
      let ObttokenObjet = JSON.parse(Obttoken);
      // Asume que tu objeto tiene una propiedad 'token' que almacena el token JWT
      return ObttokenObjet.token;
    } catch (e) {
      console.error("Error parsing token from localStorage", e);
      return null; // Retorna null si el parseo falla
    }
  }
  public decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Error decoding token", error);
        return null;
      }
    }
    return null;
  }
  
  public removeToken(): void {
    window.sessionStorage.removeItem('auth-token');
  }

}
