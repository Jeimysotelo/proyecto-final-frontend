import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-events',
  templateUrl: './update-events.component.html',
  styleUrl: './update-events.component.css'
})
export class UpdateEventsComponent {
  
  updateEvent: FormGroup;
  eventId!: string;
  oneEvent: any;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateEvent = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required,]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      initialDate: ['', [Validators.required,]],
      urlImagen: ['', [Validators.required,]],
    });
  }

  ngOnInit(): void {
    // Obtiene el ID del producto de la ruta
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.eventId) {
      // Recupera los datos del producto y llena el formulario
      this.eventService.getEventById(this.eventId).subscribe(product => {
        this.updateEvent.patchValue(product);
        this.oneEvent= product.data
      });
    }
  }

  onSubmit(): void {
    if (this.updateEvent.valid) {
      this.eventService.updateEvent(this.eventId, this.updateEvent.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'El producto ha sido actualizado con éxito.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/show-events']); // Redirige a la lista de productos
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
