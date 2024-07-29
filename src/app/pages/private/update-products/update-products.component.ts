import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css'
})
export class UpdateProductsComponent {
  updateProduct: FormGroup;
  productId!: string;
  oneProduct: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      urlImagen: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    // Obtiene el ID del producto de la ruta
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      // Recupera los datos del producto y llena el formulario
      this.productService.getProductById(this.productId).subscribe(product => {
        this.updateProduct.patchValue(product);
        this.oneProduct = product.data
        console.log(product)
      });
    }
  }

  onSubmit(): void {
    if (this.updateProduct.valid) {
      this.productService.updateProduct(this.productId, this.updateProduct.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'El producto ha sido actualizado con éxito.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/show-products']); // Redirige a la lista de productos
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el producto. Intenta nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
}
