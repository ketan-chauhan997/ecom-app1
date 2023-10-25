import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[]|[]>();
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
      this.cartData.emit([data]);
    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    
  }

  RemoveToCart(prodId:number){
    let cartData =localStorage.getItem('localCart');
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items= items.filter((data:Product)=>prodId!=data.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToUserCart(cartData:Cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }

  getCartList(userId:number){
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).
    subscribe(result=>{
      console.warn(result);
      if(result && result.body)
      {
        this.cartData.emit(result.body);
      }
    });
  }
  RemoveToCartDb(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }

  currentCart(){
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userId}`)
  }

  orderNow(data:Order){
    return this.http.post('http://localhost:3000/orders',data);
  }

  myOrders(){
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userId}`);
  }

  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    })
  }
}
