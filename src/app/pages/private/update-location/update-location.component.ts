import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrl: './update-location.component.css'
})
export class UpdateLocationComponent {
  updateLocation: FormGroup;
  locationId!: string;
  oneLocation: any;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateLocation = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      urlImagen: ['', [Validators.required,]],
    });
  }

  ngOnInit(): void {
    // Obtiene el ID del producto de la ruta
    this.locationId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.locationId) {
      // Recupera los datos del producto y llena el formulario
      this.locationService.getLocationById(this.locationId).subscribe(product => {
        this.updateLocation.patchValue(product);
        this.oneLocation= product.data
      });
    }
  }

  onSubmit(): void {
    if (this.updateLocation.valid) {
      this.locationService.updateLocation(this.locationId, this.updateLocation.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'El producto ha sido actualizado con éxito.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/show-location']); // Redirige a la lista de productos
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
