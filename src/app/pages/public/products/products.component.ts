import { Component, Input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any; 

  @Input() showProducts: boolean = true;

  constructor(private productService: ProductsService){

  }

  ngOnInit(){
    this.productService.getProduct().subscribe(data => {
      this.products = data
      console.log(this.products.data)

    })
  }

  comprado(){
    Swal.fire({
      title:'Producto Comprado exitosamente',
      icon: 'success',
      timer:2000
    })
  }
}
