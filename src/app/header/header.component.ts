import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route:Router, private product:ProductService){}
  navBarType:string='default';
  sellerName:string='';
  userName:string='';
  cartCount:number=0;
  searchedProducts:undefined|Product[];
  ngOnInit():void{
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          this.sellerName=''
          console.warn("Inside seller area");
          this.navBarType='seller';
          let sellerVar= localStorage.getItem('seller');
          let sellerData= sellerVar && JSON.parse(sellerVar);
          this.sellerName=sellerData.name;
        }
        else if (localStorage.getItem('user') ){
          this.userName='';
          console.warn('Inside User area');
          this.navBarType='user';
          let userVar= localStorage.getItem('user');
          let userData= userVar && JSON.parse(userVar);
          console.warn(userData);
          console.warn(userData[0].name)
          this.userName=userData[0].name;
        }
        else{
          console.warn('Outside Seller');
          this.navBarType='default';
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartCount=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe(items=>{
      this.cartCount=items.length;
    })
  }
  clearLocalStorage():void{
    localStorage.removeItem('seller');
    this.route.navigate(['/']); 
  }
  clearLocalStorageUser():void{
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }
  searchedProduct(keyword:KeyboardEvent){
    if(keyword){
      const element= keyword.target as HTMLInputElement;
      this.product.serachedProducts(element.value).subscribe((result)=>{
        console.warn(result);
        this.searchedProducts=result;
      })
    }
  }
  hideSearch(){
    this.searchedProducts=undefined;
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
}


