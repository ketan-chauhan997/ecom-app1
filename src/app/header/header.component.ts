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
  searchedProducts:undefined|Product[];
  ngOnInit():void{
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          console.warn("Inside seller area");
          this.navBarType='seller'
          let sellerVar= localStorage.getItem('seller');
          let sellerData= sellerVar && JSON.parse(sellerVar)[0];
          this.sellerName=sellerData.name;
        }
        else{
          console.warn('Outside Seller');
          this.navBarType='default';
        }
      }
    })
  }
  clearLocalStorage():void{
    localStorage.removeItem('seller');
    this.route.navigate(['/']); 
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


