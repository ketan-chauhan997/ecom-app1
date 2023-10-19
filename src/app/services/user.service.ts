import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoginErrorMessage = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }
  SignUpUser(data:SignUp){
    console.warn(data);
    this.http.post("http://localhost:3000/users",data,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/'])
      }
    });
  }

  LoginUser(data:Login){
    // console.warn(data);
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe(result=>{
      console.warn(result);
      if(result && result.body?.length){
        this.userLoginErrorMessage.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
      else{
        console.warn('Login failed')
        this.userLoginErrorMessage.emit(true);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
