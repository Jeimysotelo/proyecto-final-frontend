import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addToCart = createAction('[Cart] Add Item', props<{ product: Product }>());
export const removeFromCart = createAction('[Cart] Remove Item', props<{ productId: string }>());
export const clearCart = createAction('[Cart] Clear Cart');