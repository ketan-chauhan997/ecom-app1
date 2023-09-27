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
  signUp(value:SignUp):void{
    // console.warn(value)
    this.seller.sellerSignUp(value).subscribe((result)=>{
      if(result){
        this.route.navigate(['seller-home']);
      }
    });
  }
}
