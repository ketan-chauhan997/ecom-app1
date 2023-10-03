import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route:Router){}
  navBarType:string='default';
  sellerName:string='';
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
}
