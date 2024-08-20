import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '../../models/product.model';

export interface CartState {
  items: { [id: string]: Product & { quantity: number } };
}

export const initialState: CartState = {
  items: {}
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const item = state.items[product.id];
    return {
      ...state,
      items: {
        ...state.items,
        [product.id]: item 
          ? { ...item, quantity: item.quantity + 1 }
          : { ...product, quantity: 1 }
      }
    };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const { [productId]: removed, ...items } = state.items;
    return {
      ...state,
      items
    };
  }),
  on(CartActions.clearCart, () => initialState)
);