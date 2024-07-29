import { Component } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-location',
  templateUrl: './show-location.component.html',
  styleUrl: './show-location.component.css'
})
export class ShowLocationComponent {
  locations: any; 

  constructor(private locationService: LocationService){
  }

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.locationService.getLocations().subscribe(data => {
      this.locations = data
      console.log(this.locations.data)
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
        this.locationService.deleteLocationById(id).subscribe((data) => {
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
