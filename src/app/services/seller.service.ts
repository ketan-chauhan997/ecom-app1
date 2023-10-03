import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isSellerLoginError= new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }
  sellerSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
  });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  sellerLogin(data:Login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body.length){
        console.warn("User logged in");
        localStorage.setItem('seller',JSON.stringify(result.body));
          this.route.navigate(['seller-home']);
      }
      else{
        console.warn("Login failed");
        this.isSellerLoginError.emit(true);
      }
    })
    // console.warn(test);
  }
}
