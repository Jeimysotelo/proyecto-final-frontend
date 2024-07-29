import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventsService } from '../../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent {
  newEvent: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
      this.newEvent = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required,]],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        initialDate: ['', [Validators.required,]],
        urlImagen: ['', [Validators.required,]],
      })
    }

  onSumbit() {
    if (this.newEvent.valid) {
      console.log(this.newEvent.value);
      this.eventsService.createEvent(this.newEvent.value).subscribe({
        next: (data) => {
          console.log(data);
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Evento registrado!',
            text: 'El Evento ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Reiniciar el formulario después de cerrar la alerta
            this.newEvent.reset();
          });
        },
        error: (err) => {
          // Manejar errores
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al registrar el Evento. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(err);
        }
      });
    }
  }
}
