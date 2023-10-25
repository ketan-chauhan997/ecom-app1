import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Summary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  constructor(private prod:ProductService){}
  userCart:undefined|Cart[];
  priceSummary:Summary={
    amount:0,
    tax:0,
    delivery:0,
    discount:0,
    total:0
  }

  ngOnInit():void{
    this.prod.currentCart().subscribe((result)=>{
      // this.userCart=result;
      // console.warn(result);
      this.userCart=result;
      let price:number=0;
      result.forEach(item=>{
        if(item.quantity)
        price=price+ (+item.prodPrice* +item.quantity);
      })
      this.priceSummary.amount=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=100;
      this.priceSummary.total=price*(110/100)+100-(price/10);
      console.warn("price is ",this.priceSummary.total);
    })
  }
}
