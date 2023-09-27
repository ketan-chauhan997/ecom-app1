import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private route: Router){}
  showLogin:boolean=false;
  ngOnInit():void{
    this.seller.reloadSeller();
  }
  SignUp(value:SignUp):void{
    // console.warn(value)
    this.seller.sellerSignUp(value);
  }
  LoginSeller(value:any){

  }
  OpenLogin(){
    this.showLogin=true;
  }
  OpenSeller(){
    this.showLogin=false;
  }
}
