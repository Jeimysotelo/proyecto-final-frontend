import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartSelectors from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  cartItemCount$: Observable<number>;

  constructor(
    private userService: UsersService, 
    private router: Router,
    private store: Store
  ) {
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemsCount);
  }

  ngOnInit(): void {
    this.checkAuthentication();

    // Suscribirse al estado del usuario para actualizar la UI en tiempo real
    this.userService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'admin';
    });
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token) {
      this.isAuthenticated = true;
      this.isAdmin = role === 'admin';
    } else {
      this.isAuthenticated = false;
      this.isAdmin = false;
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}