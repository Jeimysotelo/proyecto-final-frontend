import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  BASE_URL: String = environment.baseUrl

  constructor( private http: HttpClient) { }

  getEvent(){
    return this.http.get(`${this.BASE_URL}/eventos`)
  }

  createEvent(newEvent:any){
    return this.http.post(`${this.BASE_URL}/eventos`, newEvent)
  }

  deleteEvent(id: any){
    return this.http.delete(`${this.BASE_URL}/eventos/${id}`)
  }
}
