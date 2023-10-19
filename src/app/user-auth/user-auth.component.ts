import { Component } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showUserLogin:boolean=false;
  showUserLoginError:undefined|string;
  constructor(private user:UserService){}
  ngOnInit():void{
    this.user.userAuthReload(); 
  }
  OpenLoginUser(){
    this.showUserLogin=true;
  }
  OpenUserSignUp(){
    this.showUserLogin=false;
  }
  UserSignUp(val:SignUp){
    // console.warn(val);
    this.user.SignUpUser(val);
  }
  UserLogin(val:Login){
    console.warn(val);
  }
}
