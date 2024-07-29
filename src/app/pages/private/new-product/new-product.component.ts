import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  newProduct: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
      this.newProduct = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required,]],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        urlImagen: ['', [Validators.required]],
        quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
      })
    }

  onSumbit() {
    if (this.newProduct.valid) {
      console.log(this.newProduct.value);
      this.productService.registerProduct(this.newProduct.value).subscribe({
        next: (data) => {
          console.log(data);
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Producto registrado!',
            text: 'El producto ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Reiniciar el formulario después de cerrar la alerta
            this.newProduct.reset();
          });
        },
        error: (err) => {
          // Manejar errores
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al registrar el producto. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(err);
        }
      });
    }
  }
  }