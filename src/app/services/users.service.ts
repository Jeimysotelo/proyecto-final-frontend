import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BASE_URL: string = environment.baseUrl;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getUserFromLocalStorage(): any {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    return token ? { role } : null;
  }

  register(user: any) {
    return this.http.post(`${this.BASE_URL}/auth/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.BASE_URL}/auth/login`, { email, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.role); // Guardar el rol en localStorage
          this.userSubject.next({ role: response.role });
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // Limpiar el rol de localStorage
    this.userSubject.next(null);
  }
}
