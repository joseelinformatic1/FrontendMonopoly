import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { UserPayload } from '../interfaces/UserPayload';
import { StorageService } from './storage.service';

catchError
const API_URL = 'http://localhost:8090/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  API_URL: any;
  constructor(private http: HttpClient,private storageService: StorageService) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' }).pipe(
      catchError(error => {
        // Aquí podrías manejar el error como prefieras
        console.error('An error occurred:', error);
        return throwError(() => new Error('An error occurred while fetching the user board.'));
      })
    );
  }

  getUserProfile(nickname: string): Observable<any> {
    let headers = new HttpHeaders();
    let token = this.storageService.getToken();
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Asegúrate de que la URL esté construida correctamente
    console.log(API_URL+'/usuario/'+nickname); // Solo para propósitos de depuración
  
    return this.http.get(API_URL+'/usuario/'+nickname, { headers });
  }
  
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  updateUserProfile(nickname: string, userData: any): Observable<any> {
    const token = this.storageService.getToken();
    console.log('Token:', token); // Debugging token retrieval
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log('User Data:', userData); // Debugging user data
    const fullUrl = `${API_URL}/usuario/update/${nickname}`; // Ensure API_URL is correct
    console.log('PUT Request URL:', fullUrl); // Debugging URL
    return this.http.put(fullUrl, userData, { headers });
  }
  
  
  
}
