import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../../services/products.service';
import * as CartActions from '../../../store/cart/cart.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any;

  @Input() showProducts: boolean = true;

  constructor(
    private productService: ProductsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.products = data;
      console.log(this.products.data);
    });
  }

  addToCart(product: any) {
    this.store.dispatch(CartActions.addToCart({ product }));
    this.comprado();
  }

  comprado() {
    Swal.fire({
      title: 'Producto agregado al carrito',
      icon: 'success',
      timer: 2000
    });
  }
}