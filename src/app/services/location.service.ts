import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  BASE_URL: String = environment.baseUrl

  constructor( private http: HttpClient) { }

  createLocation(newLocation:any){
    return this.http.post(`${this.BASE_URL}/localidades`, newLocation)
  }

  getLocations(){
    return this.http.get(`${this.BASE_URL}/localidades`)
  }

  deleteLocationById(id: any){
    return this.http.delete(`${this.BASE_URL}/localidades/${id}`)
  }
  
  updateLocation(id: string, location: any){
    return this.http.patch<any>(`${this.BASE_URL}/localidades/${id}`, location);
  }

  getLocationById(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/localidades/${id}`);
  }
}
