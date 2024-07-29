import { Component, Input } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrl: './show-events.component.css'
})
export class ShowEventsComponent {
  events: any; 

  @Input() showInscription: boolean = false;
  @Input() showAdmin: boolean = true;

  constructor(private eventsService: EventsService){
  }

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.eventsService.getEvent().subscribe(data => {
      this.events = data
      console.log(this.events.data)
    })
  }

  onDelete(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventsService.deleteEvent(id).subscribe((data) => {
          console.log(data);
          this.loadData();
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El Evento ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        });
      }
    });
  }

  inscripcion(){
    Swal.fire({
      title: '¡Inscripción Exitosa!',
      text: 'Te has inscrito correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
