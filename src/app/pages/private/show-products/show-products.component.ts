import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrl: './show-products.component.css'
})
export class ShowProductsComponent {

  products: any; 

  constructor(private productService: ProductsService){

  }

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.productService.getProduct().subscribe(data => {
      this.products = data
      console.log(this.products.data)
    })
  }

  onDelete(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe((data) => {
          console.log(data);
          this.loadData();
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        });
      }
    });
  }
}

