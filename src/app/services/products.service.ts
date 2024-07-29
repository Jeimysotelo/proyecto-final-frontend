import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  BASE_URL: String = environment.baseUrl

  constructor( private http: HttpClient) { }

  registerProduct(product: any){
    return this.http.post(`${this.BASE_URL}/products`, product)
  }

  getProduct(){
    return this.http.get(`${this.BASE_URL}/products`)
  }

  deleteProductById(id:any){
    return this.http.delete(`${this.BASE_URL}/products/${id}`)
  }

  updateProduct(id: string, product: any){
    return this.http.patch<any>(`${this.BASE_URL}/products/${id}`, product);
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/products/${id}`);
  }
}
