import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
