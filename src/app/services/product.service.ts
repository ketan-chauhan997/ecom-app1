import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addProduct(data:Product){
    return this.http.post('http://localhost:3000/products',data);
  }

  viewProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  deleteProducts(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
