import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';// Ajusta la ruta a tu servicio de autenticación
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


    constructor(private authService: UsersService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.user$.pipe(
        take(1),
        map(user => {
          if (user) {
            return user.role === 'admin';
          }
          // Si el userSubject es null, comprobar el rol desde localStorage
          const role = localStorage.getItem('userRole');
          return role === 'admin';
        }),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/home']); // Redirige a la página principal si no es admin
          }
        })
      );
    }
}
