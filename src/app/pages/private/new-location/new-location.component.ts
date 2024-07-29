import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrl: './new-location.component.css'
})
export class NewLocationComponent {
  newLocation: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
      this.newLocation = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        urlImagen: ['', [Validators.required,]],
      })
    }

  onSumbit() {
    if (this.newLocation.valid) {
      console.log(this.newLocation.value);
      this.locationService.createLocation(this.newLocation.value).subscribe({
        next: (data) => {
          console.log(data);
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Localidad registrada!',
            text: 'La Localidad ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Reiniciar el formulario después de cerrar la alerta
            this.newLocation.reset();
          });
        },
        error: (err) => {
          // Manejar errores
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al registrar la Localidad. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(err);
        }
      });
    }
  }
}
