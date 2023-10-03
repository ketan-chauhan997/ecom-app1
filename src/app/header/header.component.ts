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
  ngOnInit():void{
    this.route.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          console.warn("Inside seller area");
          this.navBarType='seller'
        }
        else{
          console.warn('Outside Seller');
          this.navBarType='default';
        }
      }
    })
  }
}
