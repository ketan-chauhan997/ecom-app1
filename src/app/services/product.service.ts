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

  getProductDetails(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data:Product){
    console.warn(data)
    return this.http.put<Product>(`http://localhost:3000/products/${data.id}`,data);
  }

  popularPorducts(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  productList(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  serachedProducts(searchedKeyword:any){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${searchedKeyword}`);
  }

  localAddToCart(data:Product){
    let cartData=[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
  }
}
