import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartSelectors from '../store/cart/cart.selectors';
import * as CartActions from '../store/cart/cart.actions';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<(Product & { quantity: number })[]>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  removeFromCart(productId: string) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
}